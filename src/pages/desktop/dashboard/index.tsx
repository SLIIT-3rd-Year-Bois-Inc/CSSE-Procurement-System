import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../sidebar";
import TopBar from "../top-bar";

export default function Dashboard() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <SideBar />
      <div className="flex-grow">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}
