import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import { Dashboard } from './dashboard';
import { Login } from './auth/login';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route
          index
          element={<Navigate to="/login" replace />}
        />
        <Route
          path='*'
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </QueryClientProvider>

    </BrowserRouter>
  )
}

export default App
