const BASE_URL = "https://tnp-recruitment-challenge.manitvig.live";

// Login - POST /login
export async function loginUser(username: string, password: string) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Invalid credentials");

  return await response.json(); 
}

// Refresh token - POST /refresh
export async function refreshToken(refreshToken: string) {
  const response = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) throw new Error("Could not refresh token");

  return await response.json(); 
}

// Generate Share Token
export async function generateShareToken(accessToken: string) {
  const response = await fetch(`${BASE_URL}/share`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error("Failed to generate share token");

  return await response.json();
}

// Get Shared Student Data 
export async function getSharedData(shareToken: string) {
  const response = await fetch(`${BASE_URL}/share?shareToken=${shareToken}`);

  if (!response.ok) throw new Error("Invalid or expired share token");

  return await response.json(); 
}
