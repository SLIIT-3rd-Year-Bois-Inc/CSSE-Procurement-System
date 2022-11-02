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
  const apply_mobile_styles = () => {
    document.head.innerHTML = document.head.innerHTML + `
      <style type="text/css">
        *{
          -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
        }
      </style>
    `
  }

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('display-mode is standalone');
      navigate("/login");
      apply_mobile_styles();
    }

    window.addEventListener('appinstalled', (evt) => {
      console.log('a2hs installed');
      navigate("/login");
      apply_mobile_styles();
    });
  }, []);

  return (
    <Routes>
      <Route element={<MobileTopBar />}>
        <Route path="/order" element={<PurchaseOrder />} />
        <Route path="/delivery-tracking" element={<DeliveryTracking />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/supplier/delivery-tracking" element={<SupplierDeliveryTracking />} />
      <Route path="/supplier/orders/:id" element={<ManageOrder />} />

      <Route path="/procurement/login" element={<ProcurementLogin />} />
      <Route path="/procurement" element={<Dashboard />}>
        <Route path="order" element={<Orders />} />
      </Route>
      <Route path="*" element={<Navigate to="/procurement/login" replace />} />
    </Routes>
  );
}
