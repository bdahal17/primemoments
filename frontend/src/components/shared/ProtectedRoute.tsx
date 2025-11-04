import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isBootstrapping } = useAppSelector((state) => state.user);

  if (isBootstrapping) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;