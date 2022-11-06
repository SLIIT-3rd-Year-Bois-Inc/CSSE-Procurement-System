import React, { useState } from "react";
import { DeliveryStates, OrderStates } from "../../definitions";
import Delivery from "../delivery";
import { useMutation, useQueryClient } from "react-query";
import { changeState, updateDelivery } from "../../api";
import { Portal } from "react-portal";
import AddDeliveryModal from "../add-delivery-modal";
import DeliveryAcceptModal from "../delivery-accept-modal";
interface OrderElementProps {
    item?: string,
    quantity?: number,
    number?: number;
    state?: OrderStates;
    onChangeState?: (state: OrderStates, order_id: string) => void;
    onDeliveryStateChange?: (state: OrderStates, order_id: string, delivery_id: string) => void;
    order_id?: string;
    deliveries?: any[];
    siteManager?: boolean;
}

export default function OrderElementWithDeliveries({ item, quantity, number, siteManager, order_id, deliveries }: OrderElementProps) {
    const [acceptDeliveryModal, setAcceptDeliveryModal] = useState({ show: false , delivery_id: "", state: DeliveryStates.ACCEPTED });

    const qc = useQueryClient();
    const delivery_mutation = useMutation(updateDelivery, {
        onSuccess: () => {
            qc.invalidateQueries(["orders"]);
        }
    });

    if(!order_id) {
        return <div className="p-4 border-2 border-[#0097d4] rounded-lg flex flex-col">Failed to load this order</div>
    }

    const onDeliveryChangeSubmit = (count: number, note: string) => {
        let data = {
            status: acceptDeliveryModal.state,
            accepted: 0,
            returned: 0,
            note: "",
        }

        if(!quantity) 
            return;
        
        if(acceptDeliveryModal.state === DeliveryStates.ACCEPTED) {
            data.accepted = count;
            data.returned = quantity - count;
        } else {
            data.accepted = quantity - count;
            data.returned = count;
            data.note = note;
        }

        delivery_mutation.mutate({ order_id, delivery_id: acceptDeliveryModal.delivery_id, data });
        setAcceptDeliveryModal(prev => {
            return { ...prev, show: false };
        })
    }

    const markAsCompleted = async () => {
        try {
            await changeState({ order_id ,status: OrderStates.COMPLETED });
            qc.invalidateQueries(["orders"]);
        }catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="p-4 border-2 border-[#0097d4] rounded-lg flex flex-col">
            <div className="flex-grow">
                <div className="font-bold">REFNO : #{String(number ?? 0).padStart(4, '0')}</div>
                <div>{item}</div>
                <div>Quantity in Invoice : {quantity}</div>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
                {
                    (!deliveries || deliveries.length == 0) && <div className="text-center">No deliveries yet.</div>
                }
                <div className="w-full flex flex-col gap-4 mt-2">
                {
                    (!!deliveries) && deliveries.map((d: any, index: number) => {
                        return <Delivery siteManager={siteManager} onChangeState={(state, delivery_id) => { setAcceptDeliveryModal({ show: true, state: state, delivery_id: delivery_id }) }} {...d} eta={d.eta.seconds} index={index + 1} id={d.id} status={d.status}/>
                    })
                }
                </div>
                <button onClick={markAsCompleted} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-2xl">
                    Mark As Completed
                </button>
            </div>
            { acceptDeliveryModal.show ? <Portal><DeliveryAcceptModal onClose={() => {
                 setAcceptDeliveryModal((prev) => { return { ...prev, show: false } })
            }} onSubmit={onDeliveryChangeSubmit} state={acceptDeliveryModal.state} /></Portal> : null }
        </div>
    )
}

