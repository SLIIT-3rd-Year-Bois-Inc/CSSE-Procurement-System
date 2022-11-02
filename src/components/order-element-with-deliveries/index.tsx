import React from "react";
import { OrderStates } from "../../definitions";
import { toDateOnly, toDateTime } from "../../utils/date-time";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import Delivery from "../delivery";

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

export default function OrderElementWithDeliveries({ item, quantity, number,siteManager, state, onChangeState, order_id, deliveries }: OrderElementProps) {
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
                        return <Delivery siteManager={siteManager} {...d} eta={d.seconds} index={index + 1}/>
                    })
                }
                </div>
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-2xl">
                    Mark As Completed
                </button>
            </div>

            {/* <div>
                {
                    ((state === OrderStates.APPROVED) && !siteManager) &&
                    <AiFillCheckCircle
                        size={40}
                        color="#75f94c"
                        className="mr-2 cursor-pointer"
                    />
                }
                {
                    ((state === OrderStates.APPROVED) && siteManager) &&
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => { (onChangeState && order_id) && onChangeState(OrderStates.ACCEPTED, order_id) }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => { (onChangeState && order_id) && onChangeState(OrderStates.REJECTED, order_id) }}
                            className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white bg-white font-bold py-2 px-7 mr-2 rounded-2xl">
                            Reject
                        </button>
                    </div>
                }
                {
                    (state == OrderStates.PENDING) &&
                    <BsCircleFill
                        size={32}
                        color="#f0d130"
                        className="mr-2 cursor-pointer"
                    />
                }
            </div> */}
        </div>
    )
}

