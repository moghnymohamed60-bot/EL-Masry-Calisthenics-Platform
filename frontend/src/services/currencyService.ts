export const currencyService = {
  async syncLiveRates() {
    const res = await fetch("/api/currencies/sync", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to sync exchange rates");
    return res.json();
  },
};

