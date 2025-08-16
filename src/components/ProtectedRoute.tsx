import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthed } = useAuth();
  console.log("ProtectedRoute - isAuthed:", isAuthed);
  
  if (!isAuthed) {
    console.log("Redirecting to login - not authenticated");
    return <Navigate to="/login" replace />;
  }
  
  console.log("Allowing access to protected route");
  return children;
}
