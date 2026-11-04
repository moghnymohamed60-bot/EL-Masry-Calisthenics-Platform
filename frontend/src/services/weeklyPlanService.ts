export const weeklyPlanService = {
  async getAll() {
    const res = await fetch("/api/weekly-plans", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch weekly plans");
    return res.json();
  },

  async save(payload: Record<string, unknown>) {
    const res = await fetch("/api/weekly-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save weekly plan");
    return res.json();
  },

  async remove(id: string) {
    const res = await fetch(`/api/weekly-plans?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete weekly plan");
    return res.json();
  },
};

