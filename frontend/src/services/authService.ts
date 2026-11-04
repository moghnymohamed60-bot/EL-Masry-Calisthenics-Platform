export const authService = {
  async getSession() {
    const res = await fetch("/api/auth", { credentials: "include" });
    if (!res.ok) return { user: null };
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    return data;
  },

  async changePassword(newPassword: string) {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action: "CHANGE_PASSWORD", newPassword }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Password update failed");
    return data;
  },

  async logout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action: "LOGOUT" }),
    });
  },
};

