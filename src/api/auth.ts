import API from "./client";
import { updateGlobalAuthState } from "../hooks/useAuth";

export async function login(username: string, password: string) {
  console.log("API login called with:", { username, password });
  
  try {
    const { data } = await API.post("/accounts/token/", { username, password });
    console.log("API response:", data);
    
    // Django token header returns { token: "..." }
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authUser", username);
    
    console.log("Token stored in localStorage:", { token: data.token, user: username });
    
    // Update global auth state immediately
    updateGlobalAuthState();
    console.log("Global auth state updated");
    
    return data;
  } catch (error) {
    console.error("API login error:", error);
    throw error;
  }
}

export async function register(username: string, password: string, email?: string) {
  const { data } = await API.post("/accounts/register/", { username, password, email });
  return data;
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
}
