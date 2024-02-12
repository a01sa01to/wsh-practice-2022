export const jsonFetcher = async (/** @type {string} */ url) => {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } }).then(res => {
    if (!res.ok) {
      throw new Error("failed to fetch");
    }
    return res.json();
  });

  return res;
};

/**
 * @param {string} url
 * @param {string} userId
 */
export const authorizedJsonFetcher = async (url, userId) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", "x-app-userid": userId },
  }).then(res => {
    if (!res.ok) {
      throw new Error("failed to fetch");
    }
    return res.json();
  });

  return res;
};
