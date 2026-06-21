import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login/Login";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/pages/Dashboard";
import NewOrder from "./pages/admin/pages/Orders";
import OrdersList from "./pages/admin/pages/OrdersList";

import TechnicianLayout from "./pages/technician/TechnicianLayout";
import TechnicianDashboard from "./pages/technician/pages/Dashboard";
import AssignedOrders from "./pages/technician/pages/AssignedOrders";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<NewOrder />} />
            <Route path="orders-list" element={<OrdersList />} />
          </Route>

          <Route
            path="/technician"
            element={
              <ProtectedRoute role="technician">
                <TechnicianLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TechnicianDashboard />} />
            <Route path="orders" element={<AssignedOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
