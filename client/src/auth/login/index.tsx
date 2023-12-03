import Form from './form';

export const Login = () => {
  const authenticate = (data: { email: string, password: string }) => {
    console.log(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <Form onLogin={authenticate} />
      </div>
    </div>
  );
};