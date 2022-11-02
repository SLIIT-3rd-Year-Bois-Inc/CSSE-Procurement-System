import React from "react";
import { OrderStates } from "../../definitions";
import { toDateOnly, toDateTime } from "../../utils/date-time";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import OrderElementWithDeliveries from "../order-element-with-deliveries";

interface OrderElementProps {
    item?: string,
    quantity?: number,
    total?: number;
    delivery_date?: number;
    number?: number;
    state?: OrderStates;
    siteManager?: boolean;
    onChangeState?: (state: OrderStates, order_id: string) => void;
    order_id?: string;
}

export default function OrderElement({ item, quantity, total, delivery_date, number, state, siteManager, onChangeState, order_id }: OrderElementProps) {
    return (
        <div className="p-4 items-center justify-center border-2 border-[#0097d4] rounded-lg flex flex-row">
            <div className="flex-grow">
                <div className="font-bold">REFNO : #{String(number ?? 0).padStart(4, '0')}</div>
                <div>Item : {item}</div>
                <div>Quantity : {quantity}</div>
                <div>Amount : {total}</div>
                <div>Due Date : {toDateOnly(toDateTime(delivery_date ?? 0))}</div>
            </div>
            <div className="flex-grow"></div>
            <div>
                {
                    ((state === OrderStates.APPROVED) && siteManager) &&
                    <AiFillCheckCircle
                        size={40}
                        color="#75f94c"
                        className="mr-2 cursor-pointer"
                    />
                }
                {
                    ((state === OrderStates.APPROVED) && !siteManager) &&
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
            </div>
        </div>
    )
}

