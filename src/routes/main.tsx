import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PurchaseOrder from "../pages/dashboard/purchase-order";
import DeliveryTracking from "../pages/delivery-tracking";
import Dashboard from "../pages/desktop/dashboard";
import ProcurementLogin from "../pages/desktop/login";
import Orders from "../pages/desktop/orders";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Products } from "../pages/products";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/order" element={<PurchaseOrder />} />
      <Route path="/products" element={<Products />} />
      <Route path="/delivery-tracking" element={<DeliveryTracking />} />
      <Route path="/procurement/login" element={<ProcurementLogin />} />
      <Route path="/procurement" element={<Dashboard />}>
        <Route path="order" element={<Orders />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
