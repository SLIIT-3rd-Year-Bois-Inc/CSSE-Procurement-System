import React, { useState } from "react";
import { Portal } from "react-portal";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getOrder } from "../../../api";
import AddDeliveryModal from "../../../components/add-delivery-modal";
import OrderElement from "../../../components/order-elements";
import { DeliveryStates } from "../../../definitions";

export default function ManageOrder() {
    const { id } = useParams();
    const [modalState, setModalState] = useState({ show: false, index: 1, delivery_id: "" });

    const { data, isError, isLoading } = useQuery(["orders", id], getOrder)

    if (isError) {
        return <div>Loading order failed.</div>
    }

    if (isLoading) {
        return <div>Loading</div>
    }

    if (!data) {
        return <div>Data does not exist anymore</div>;
    }

    console.log(data);
    return (
        <div className="p-4 w-full h-full flex flex-col">
            <div className="font-bold text-lg py-2">
                Order Reference : #{String(data.number ?? 0).padStart(4, '0')}
            </div>
            <OrderElement state={data.status} number={data.number} item={data.item_name} quantity={data.quantity} />
            <div className="mt-4 text-center font-bold">Deliveries for the order</div>
            {
                (!data.deliveries || data.deliveries.length == 0) &&
                <div className="mt-4 mb-10 text-center">No deliveries yet.<br></br>Add one by clicking "Add new Delivery"</div>
            }

            <div className="flex flex-col gap-4 overflow-y-auto">
            {
                data.deliveries.map((d: any, index: number) => {
                    return <Delivery {...d} eta={d.seconds} index={index + 1}/>
                })
            }
            </div>

            {
                modalState.show && <Portal><AddDeliveryModal onClose={() => setModalState(prev => { return { ...prev, show: false } })} index={1} order_id={id ?? ""} max_quantity={data.quantity} /></Portal>
            }
            <div className="w-full flex justify-center items-center">
                <button onClick={() => setModalState(prev => { return { ...prev, show: true } })} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-2xl">
                    Add new Delivery
                </button>
            </div>
        </div>
    )
}

interface DeliveryProps {
    eta?: string;
    quantity?: number;
    accepted_quantity?: number;
    status?: DeliveryStates;
    index?: number;
}

function Delivery({ eta, quantity, accepted_quantity, status, index }: DeliveryProps) {
    return (
        <div className="p-4 items-center justify-center border-2 border-[#0097d4] rounded-lg flex flex-row">
            <div className="flex-grow">
                <div className="font-bold">Delivery #{String(index ?? 0).padStart(4, '0')}</div>
                <div>Date : {eta}</div>
                <div>Sent Quantity : {accepted_quantity}</div>
                <div>Accepted Quantity : {quantity}</div>
                <div>Status : {status}</div>
            </div>
        </div>
    )
}