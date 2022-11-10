import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { deliverySchema } from "../../schema";
import { AiOutlineClose } from "react-icons/ai";
import { addDelivery } from "../../api";
import { DeliveryStates } from "../../definitions";
import { useQueryClient } from "react-query";

interface AddDeliveryModalProps {
  index: number;
  order_id: string;
  onClose?: () => void;
  max_quantity?: number;
}

export default function AddDeliveryModal({
  index,
  order_id,
  onClose,
  max_quantity,
}: AddDeliveryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deliverySchema),
  });

  const qc = useQueryClient();

  const submit = async (data: any) => {
    data.order_id = order_id;
    data.status = DeliveryStates.NOT_INITIATED;

    await addDelivery(data);
    qc.invalidateQueries(["orders"]);
    onClose && onClose();
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#00000083] z-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="rounded-xl pt-5 pb-8 px-5 bg-white min-w-[28em]"
      >
        <div className="font-bold mb-8 mt-2 text-lg text-center flex justify-center items-center">
          <div className="flex-grow">Delivery {index} </div>
          <AiOutlineClose
            size={20}
            className="cursor-pointer"
            onClick={() => {
              onClose && onClose();
            }}
          />
        </div>
        <div className="flex flex-row items-center mb-4">
          <label
            htmlFor="item"
            className="block mx-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            ETA :
          </label>
          <input
            id="eta"
            type="date"
            required
            {...register("eta")}
            className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        <div className="flex flex-row items-center mb-4">
          <label
            htmlFor="item"
            className="block mx-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Quantity :
          </label>
          <input
            id="eta"
            type="number"
            required
            {...register("quantity")}
            max={max_quantity}
            min={1}
            className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
        </div>
        <div className="ml-4 mb-4 text-sm font-medium">
          Status : Not Initiated
        </div>
        <div className="flex flex-col mx-4">
          <label
            htmlFor="item"
            className="block mb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Delivery Advice note :
          </label>
          <textarea
            id="eta"
            required
            {...register("note")}
            className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div className="w-full flex justify-center items-center mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl">
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
}
