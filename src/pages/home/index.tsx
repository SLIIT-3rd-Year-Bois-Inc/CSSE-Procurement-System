import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { DB } from "../../firebase";

export function Home() {
  const [message, setMessage] = useState("");
  const [your_message, setYourMessage] = useState("");

  const test_firebase = async () => {
    const helloRef = collection(DB, "hello");
    let res_doc = await getDoc(doc(helloRef, "message"));
    let data = res_doc.data();

    if (data) {
      setMessage("From database : " + data.message);
      return;
    }

    setMessage("No data in the DB");
  };

  const set_message = async (e: any) => {
    const helloRef = collection(DB, "hello");
    await setDoc(doc(helloRef, "message"), { message: your_message });

    setMessage("Message set to : " + your_message);
  };

  return (
    <div>
      <h1>Start Development</h1>
      <div>{message}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={test_firebase}
      >
        Get message
      </button>
      <br></br>
      <input
        type="text"
        value={your_message}
        onChange={(e) => {
          setYourMessage(e.target.value);
        }}
      ></input>
      <br></br>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={set_message}
      >
        Set message
      </button>
    </div>
  );
}
