export const getApiUrl = () =>
  localStorage.getItem("apiAddress") ||
  import.meta.env.VITE_RENDER_API_URL ||
  "http://localhost:5000";

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const validateToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await fetch(`${getApiUrl()}/auth/check`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    return true;
  } catch {
    clearAuthStorage();
    return false;
  }
};
