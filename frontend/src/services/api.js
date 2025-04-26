// src/services/api.js
const API_BASE_URL = "https://localhost:5000";

export const getUsers = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/User`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!res.ok) throw new Error("Không thể gọi API!");

  return res.json();
};
