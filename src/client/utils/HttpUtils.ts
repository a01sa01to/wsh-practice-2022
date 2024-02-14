export const jsonFetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("failed to fetch");
    }
    return res.json();
  });

  return res;
};

export const authorizedJsonFetcher = async (url: string, userId: string) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", "x-app-userid": userId },
  }).then((res) => {
    if (!res.ok) {
      throw new Error("failed to fetch");
    }
    return res.json();
  });

  return res;
};
