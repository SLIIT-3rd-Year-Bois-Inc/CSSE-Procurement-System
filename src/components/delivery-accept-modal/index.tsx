import React, { useState } from "react";
import { DeliveryStates, OrderStates } from "../../definitions";

interface DeliveryAcceptProps {
  state?: DeliveryStates;
  onSubmit?: (count: number, note: string) => void;
  onClose?: () => void;
}

export default function DeliveryAcceptModal({
  state,
  onClose,
  onSubmit,
}: DeliveryAcceptProps) {
  const [count, setCount] = useState<number>(1);
  const [note, setNote] = useState<string>("");

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#00000083] z-50">
      <div className="rounded-xl p-8 px-5 bg-white min-w-[28em]">
        <div className="flex flex-row items-center mb-4">
          <label
            htmlFor="item"
            className="block mx-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {state === DeliveryStates.ACCEPTED ? "Accepted" : "Returned"}{" "}
            Quantity :
          </label>
          <input
            id="eta"
            type="number"
            required
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        {state === DeliveryStates.RETURNED && (
          <div className="flex flex-col mx-4">
            <label
              htmlFor="item"
              className="block mb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Reason for return :
            </label>
            <textarea
              id="eta"
              required
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
        )}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => {
              onSubmit && onSubmit(count, note);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl"
          >
            {state === DeliveryStates.ACCEPTED ? "Accept" : "Return"}
          </button>
          <button
            onClick={() => {
              onClose && onClose();
            }}
            className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white bg-white font-bold py-2 px-7 mr-2 rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
