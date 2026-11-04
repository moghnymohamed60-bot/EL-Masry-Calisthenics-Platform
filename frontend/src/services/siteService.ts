export const siteService = {
  async fetchPublicBundle() {
    const res = await fetch("/api/site", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch site bundle");
    return res.json();
  },

  async updateSiteBundle(payload: Record<string, unknown>) {
    const res = await fetch("/api/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to update site bundle");
    return res.json();
  },
};

