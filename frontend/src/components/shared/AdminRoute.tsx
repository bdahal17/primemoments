import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import type { ReactNode } from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, isAdmin, isBootstrapping } = useAppSelector((state) => state.user);

//Route protection disabled for testing
//   if (isBootstrapping) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!isAdmin) {
//     return <Navigate to="/unauthorized" replace />;
//   }

  return <>{children}</>;
};

export default AdminRoute;