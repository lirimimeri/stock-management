import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { Login } from './auth/login';
import { Dashboard } from './dashboard';

export const Routes = () => (
  <Switch>
    <Route path='/login' element={<Login />} />
    <Route path='/dashboard/*' element={<Dashboard />} />
    <Route index element={<Navigate to='/login' replace />} />
    <Route path='*' element={<Navigate to='/dashboard' replace />} />
  </Switch>
);
