import { useContext, useState } from "react";

import { apiService } from "../../../configs/api";
import { User, authContext } from "../../../context/auth";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useContext(authContext);
  const navigate = useNavigate();

  const authenticate = async (payload: {email: string, password: string}) => {
    setIsLoading(true);
    setError(null);

    try {
      const { token, user } = await apiService.post<{ token: string, user: User }>('users/login', payload);
      login(token, user)
      navigate('/dashboard/products');
    } catch(e: unknown) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false)
    }
  };

  return {
    isLoading,
    error,
    authenticate,
  };
};
