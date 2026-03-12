import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoaderSpinner from "../ui/LoadingSpinner";
 

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <LoaderSpinner />;

  if (!user) {
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
return children;
}