import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes } from './Routes';
import { User, authContext } from './context/auth';
import './index.css';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [])
  

  const login = (newToken: string, authenticatedUser?: User) => {
    setToken(newToken);
    if (authenticatedUser) setUser(authenticatedUser)
  }

  const logout = () => {
    setToken(null);
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <authContext.Provider value={{ login, logout, token, user }}>
        <Routes />
      </authContext.Provider>
    </QueryClientProvider>
    </>
  )
}

export default App;
