// Judges + participants: start the server, then run `npm run verify`. Prints a score out of 10.
const B = process.env.BASE_URL || "http://localhost:4000";
const call = async (m, p, body, t) => {
  const r = await fetch(B + p, {
    method: m,
    headers: {
      "Content-Type": "application/json",
      ...(t && { Authorization: "Bearer " + t }),
    },
    body: body && JSON.stringify(body),
  });
  let j = {};
  try {
    j = await r.json();
  } catch {}
  return { s: r.status, j };
};
(async () => {
  let pass = 0;
  const t = (name, ok) => {
    console.log((ok ? "PASS " : "FAIL ") + name);
    if (ok) pass++;
  };
  const email = `u${Date.now()}@test.dev`,
    pw = "Passw0rd!";
  let r = await call("POST", "/api/auth/register", {
    name: "T",
    email,
    password: pw,
  });
  t("register 201", r.s === 201);
  r = await call("POST", "/api/auth/register", {
    name: "T",
    email,
    password: pw,
  });
  t("duplicate email 409", r.s === 409);
  r = await call("POST", "/api/auth/login", { email, password: "wrong" });
  t("bad login 401", r.s === 401);
  r = await call("POST", "/api/auth/login", { email, password: pw });
  const tok = r.j.token;
  t("login returns token", r.s === 200 && !!tok);
  r = await call("GET", "/api/users/me");
  t("me without token 401", r.s === 401);
  r = await call("GET", "/api/users/me", null, tok);
  t(
    "me ok, no password leak",
    r.s === 200 && r.j.user && !JSON.stringify(r.j).match(/password/i),
  );
  r = await call("GET", "/api/events");
  const id = r.j.events?.[0]?.id;
  t("GET events", r.s === 200 && Array.isArray(r.j.events));
  r = await call("POST", `/api/events/${id}/register`, null, tok);
  const a = r.s === 201;
  r = await call("POST", `/api/events/${id}/register`, null, tok);
  t("register event + duplicate 409", a && r.s === 409);
  r = await call("GET", "/api/events/registered", null, tok);
  t("GET registered", r.s === 200 && r.j.events?.length === 1);
  r = await call("GET", "/api/admin/stats", null, tok);
  const forb = r.s === 403;
  const adm = (
    await call("POST", "/api/auth/login", {
      email: "admin@arena.dev",
      password: "Admin@123",
    })
  ).j.token;
  r = await call("GET", "/api/admin/stats", null, adm);
  t("admin stats: 403 for user, 200 for admin", forb && r.s === 200);
  console.log(
    `\nSCORE: ${pass}/11 checks passed (judges scale this into Functionality marks)`,
  );
  process.exit(0);
})();
