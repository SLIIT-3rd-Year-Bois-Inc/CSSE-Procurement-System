import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PurchaseOrder from "../pages/dashboard/purchase-order";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Products } from "../pages/products";


export function MainRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<PurchaseOrder />} />
            <Route path="/products" element={<Products />} />
            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    )
}