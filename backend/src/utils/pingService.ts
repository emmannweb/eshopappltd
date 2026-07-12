import https from "https";

export const startSelfPing = (url: string, intervalMinutes: number = 13) => {
  // Convert minutes to milliseconds
  const intervalMs = intervalMinutes * 60 * 1000;

  console.log(
    `[Self-Ping] Worker initialized. Target: ${url} every ${intervalMinutes}m`,
  );

  setInterval(() => {
    https
      .get(url, (res) => {
        console.log(`[Self-Ping] Ping sent. Status Code: ${res.statusCode}`);
      })
      .on("error", (err) => {
        console.error(`[Self-Ping] Ping failed: ${err.message}`);
      });
  }, intervalMs);
};
