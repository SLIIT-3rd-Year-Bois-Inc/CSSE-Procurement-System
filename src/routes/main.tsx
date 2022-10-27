import React from "react";
import { Route, Routes } from "react-router-dom";
import PurchaseOrder from "../pages/dashboard/purchase-order";
import { Home } from "../pages/home";
import { Login } from "../pages/login";


export function MainRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<PurchaseOrder />} />
        </Routes>
    )
}