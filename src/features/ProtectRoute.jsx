import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userData = sessionStorage.getItem('user');

  return userData? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;