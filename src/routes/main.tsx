import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MobileTopBar from "../components/mobile-container";
import PurchaseOrder from "../pages/dashboard/purchase-order";
import DeliveryTracking from "../pages/delivery-tracking";
import Dashboard from "../pages/desktop/dashboard";
import ProcurementLogin from "../pages/desktop/login";
import Orders from "../pages/desktop/orders";
import { Login } from "../pages/login";
import { Products } from "../pages/products";
import SupplierDeliveryTracking from "../pages/supplier/delivery-tracking";
import ManageOrder from "../pages/supplier/manage-order";

export function MainRouter() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('display-mode is standalone');
      navigate("/login");
    }

    window.addEventListener('appinstalled', (evt) => {
      console.log('a2hs installed');
      navigate("/login");
    });
  }, []);

  return (
    <Routes>
      <Route element={<MobileTopBar />}>
        <Route path="/order" element={<PurchaseOrder />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/supplier/delivery-tracking" element={<SupplierDeliveryTracking />} />
      <Route path="/supplier/orders/:id" element={<ManageOrder />} />
      <Route path="/delivery-tracking" element={<DeliveryTracking />} />
      <Route path="/procurement/login" element={<ProcurementLogin />} />
      <Route path="/procurement" element={<Dashboard />}>
        <Route path="order" element={<Orders />} />
      </Route>
      <Route path="*" element={<Navigate to="/procurement/login" replace />} />
    </Routes>
  );
}
