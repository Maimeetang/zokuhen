export function getMalClientId(): string {
  const clientId = process.env.MAL_CLIENT_ID;
  if (!clientId) {
    throw new Error("MAL_CLIENT_ID is not set");
  }
  return clientId;
}

export function getMalApiBaseUrl(): string {
  const apiBaseUrl = process.env.MAL_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error("MAL_API_BASE_URL is not set");
  }
  return apiBaseUrl;
}
