import Form from './components/form';
import { useAuthentication } from './utils/useAuthentication';
import { Alert } from '../../components/alert';

export const Login = () => {
  const { isLoading, error, authenticate } = useAuthentication();

  const errorMessage = error ? <Alert message={error} type='danger' /> : null

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        { errorMessage }
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <Form onLogin={authenticate} isLoading={isLoading} />
      </div>
      </div>
    </div>
  );
};