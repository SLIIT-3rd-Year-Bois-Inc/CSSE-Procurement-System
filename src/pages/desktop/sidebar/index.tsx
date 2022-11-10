import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { TiClipboard } from "react-icons/ti";
import { BiPackage } from "react-icons/bi";
import { SiPodman } from "react-icons/si";
import { FiUser } from "react-icons/fi";

export default function SideBar() {
  return (
    <div className="w-[20em] h-full bg-[#0197d4] flex flex-col justify-center">
      <div className="text-white font-bold text-2xl mt-8 text-center">
        Construction
      </div>
      <div className="flex-grow"></div>
      <SideBarItem active>
        <BsCartCheck className="mr-3" />
        Orders
      </SideBarItem>
      <SideBarItem>
        <TiClipboard className="mr-3" />
        Transactions
      </SideBarItem>
      <SideBarItem>
        <BiPackage className="mr-3" />
        Products
      </SideBarItem>
      <SideBarItem>
        <SiPodman className="mr-3" />
        Supplier
      </SideBarItem>
      <SideBarItem>
        <FiUser className="mr-3" />
        Users
      </SideBarItem>
      <div className="flex-grow"></div>
    </div>
  );
}

interface SideBarItemProps extends React.HTMLProps<HTMLDivElement> {
  children: any;
  active?: boolean;
}
function SideBarItem({ children, active, ...rest }: SideBarItemProps) {
  return (
    <div
      className={`px-8 py-2 text-white flex items-center cursor-pointer hover:bg-white hover:text-black text-xl ${
        active ? "font-bold" : "font-thin"
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
