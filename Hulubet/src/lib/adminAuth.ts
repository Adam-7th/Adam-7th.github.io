export function isAdminRequest(request: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return process.env.NODE_ENV !== "production";
  }

  const auth = request.headers.get("authorization") ?? "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const headerToken = request.headers.get("x-admin-token") ?? "";

  return bearer === token || headerToken === token;
}
