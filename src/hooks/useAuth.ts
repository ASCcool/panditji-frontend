import { useEffect, useState, useCallback } from "react";

// Global auth state to prevent race conditions
let globalAuthState = {
  token: localStorage.getItem("authToken"),
  username: localStorage.getItem("authUser") || "",
  listeners: new Set<() => void>()
};

const updateGlobalAuthState = () => {
  globalAuthState.token = localStorage.getItem("authToken");
  globalAuthState.username = localStorage.getItem("authUser") || "";
  
  // Notify all listeners
  globalAuthState.listeners.forEach(listener => listener());
  
  console.log("Global auth state updated:", { 
    token: globalAuthState.token ? "exists" : "null", 
    username: globalAuthState.username 
  });
};

export function useAuth() {
  const [state, setState] = useState({
    token: globalAuthState.token,
    username: globalAuthState.username
  });
  
  useEffect(() => {
    const updateState = () => {
      setState({
        token: globalAuthState.token,
        username: globalAuthState.username
      });
    };
    
    // Add listener to global state
    globalAuthState.listeners.add(updateState);
    
    // Initial state update
    updateState();
    
    return () => {
      globalAuthState.listeners.delete(updateState);
    };
  }, []);
  
  const isAuthed = !!state.token;
  
  console.log("useAuth state:", { isAuthed, token: state.token ? "exists" : "null", username: state.username });
  
  return { isAuthed, token: state.token, username: state.username };
}

// Export the global update function for direct use
export { updateGlobalAuthState };
