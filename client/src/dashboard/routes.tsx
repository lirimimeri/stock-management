import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Products } from './products';
import { Outcomes } from './outcomes';

export const Routes = () => {
  return (
    <div className="sm:ml-64 h-screen">
    <ReactRoutes>
      <Route path="/products" element={<Products />} />
      <Route path="/outcomes" element={<Outcomes />} />
    </ReactRoutes>
  </div>
  )
}