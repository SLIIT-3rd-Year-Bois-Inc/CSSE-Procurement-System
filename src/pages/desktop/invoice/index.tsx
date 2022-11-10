import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../../api";

export default function Invoice() {
  const { id } = useParams();
  const { data, refetch } = useQuery(["order", id], getOrder);
  const update_order = useMutation(updateOrder, {
    onSuccess: () => {
      refetch();
    },
  });

  const [add, setAdd] = useState<number>(0);
  const [deduct, setDeduct] = useState<number>(0);

  if (!data) {
    return <div className="text-center">Please wait</div>;
  }

  calculateInvoice(data, add, deduct);
  const total_allowed = data.total ?? 0;

  console.log(data);
  return (
    <div>
      <div className="my-2 ml-8 mt-10 font-bold text-3xl text-center">
        Invoice
      </div>
      <div className="ml-8">
        <div className="flex flex-col gap-2 mt-8 text-lg">
          <div>Supplier : {data.supplier.name}</div>
          <div>Item : {data.item_name}</div>
          <div>Received Quantity : </div>
          <div>Accepted Quantity : </div>
          <div>Returned Quantity : </div>
          <div>Total Amount : Rs {data.new_total ?? 0}</div>
        </div>
        <div className="mt-8 flex items-center ml-4">
          Add to total
          <div className="flex flex-row ml-4">
            <div className="mr-3">
              <input
                onChange={(e) => {
                  setAdd(parseInt(e.target.value));
                }}
                type="number"
                id="quantity"
                defaultValue={0}
                min={0}
                placeholder="Quantity"
                className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center m-4">
          Deduct from total
          <div className="flex flex-row ml-4">
            <div className="mr-3">
              <input
                onChange={(e) => {
                  let val = parseInt(e.target.value);

                  if (val < total_allowed) {
                    setDeduct(val);
                    return;
                  }

                  setDeduct(total_allowed);
                }}
                type="number"
                id="quantity"
                min={0}
                max={data.total ?? 0}
                defaultValue={0}
                placeholder="Quantity"
                className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl"
          onClick={() => {
            // update_order.mutate({ order_id: id, { total } })
          }}
        >
          Apply
        </button>
      </div>
      <div className="w-full flex flex-row">
        <div className="flex-grow"></div>
        <button className="mx-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-2xl">
          Next
        </button>
      </div>
    </div>
  );
}

function calculateInvoice(data: any, add: number, deduct: number) {
  let accepted = 0;
  let returned = 0;
  let _add = add || 0;
  let _deduct = deduct || 0;

  for (const del of data.deliveries) {
    if (del.accepted) accepted += del.accepted;

    if (del.returned) returned += del.returned;
  }

  if (data.total) {
    data.new_total = data.total + _add - _deduct;
  }

  data.accepted = accepted;
  data.returned = returned;
}
