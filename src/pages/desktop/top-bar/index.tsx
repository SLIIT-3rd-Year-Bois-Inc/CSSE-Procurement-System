import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { DBCollections } from "../../../definitions";
import { Auth, DB } from "../../../firebase";

export default function TopBar() {
  const [username, setUsername] = useState("Loading");

  // Get username
  useEffect(() => {
    Auth.onAuthStateChanged(async (data) => {
      if (data) {
        let user = await getDoc(
          doc(DB, DBCollections.USERS, data.uid)
        );
        if (user && user.data()) {
          setUsername((user.data() as any).name);
          return;
        } else {
          setUsername("Unknown User");
        }
      }
    });
  }, []);

  return (
    <div className="flex flex-row py-2 px-6 items-center font-semibold bg-[#eceaeb]">
      <div>Orders</div>
      <div className="flex-grow"></div>
      <div className="flex flex-row justify-center items-center">
        <div className="mr-4">{username}</div>
        <img src="/user-placeholder.png" className="w-12" alt="Profile Image" />
      </div>
    </div>
  );
}
