export const subscriptionService = {
  async getAll() {
    const res = await fetch("/api/subscriptions", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch subscriptions");
    return res.json();
  },

  async create(payload: Record<string, unknown>) {
    const res = await fetch("/api/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create subscription");
    return data;
  },

  async update(id: string, updates: Record<string, unknown>) {
    const res = await fetch("/api/subscriptions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, ...updates }),
    });
    if (!res.ok) throw new Error("Failed to update subscription");
    return res.json();
  },

  async remove(id: string) {
    const res = await fetch(`/api/subscriptions?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to delete subscription");
    return res.json();
  },
};

