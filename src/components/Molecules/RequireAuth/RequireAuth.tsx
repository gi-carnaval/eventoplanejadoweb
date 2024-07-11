import { getAccessToken } from '@lib/tokenService';
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
    return <div>Loading...</div>; // Mostre um indicador de carregamento enquanto a autenticação é verificada
  }
  if (!isAuthenticated) {
    localStorage.setItem('lastLocation', location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
}
