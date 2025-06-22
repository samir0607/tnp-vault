export async function loginUser(username: string, password: string) {
  const response = await fetch("https://tnp-recruitment-challenge.manitvig.live/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return await response.json(); 
}
