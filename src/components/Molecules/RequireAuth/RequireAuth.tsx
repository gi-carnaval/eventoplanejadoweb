import { getAccessToken } from '@lib/tokenService';
import { Skeleton } from '@mui/material';
import { notifyInfo } from '@src/lib/toastsNotifier';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  function hasAuth() {
    return getAccessToken() !== null;
  }

  useEffect(() => {
    if (hasAuth()) {
      setIsAuthenticated(true);
    } else {
      notifyInfo("Faça login para prosseguir", 2000)
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
        <Skeleton variant="rounded" width="25%" height={60} animation="wave" />
        <Skeleton variant="rounded" width="25%" height={60} animation="wave" />
        <Skeleton variant="rounded" width="25%" height={60} animation="wave" />
      </div>
    )
  }
  if (!isAuthenticated) {
    localStorage.setItem('lastLocation', location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
}
