import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { changeState, getAllOrders } from "../../../api";
import Chip from "../../../components/chip";
import OrderElement from "../../../components/order-elements";
import { OrderStates } from "../../../definitions";

export default function SupplierDeliveryTracking() {
    const [status, setStatus] = useState<OrderStates>(OrderStates.APPROVED);
    const { data, refetch } = useQuery(["orders", status, true], getAllOrders);

    const change_order_state = useMutation(changeState, {
        onSuccess:() => {
            refetch();
        }
    })

    const onOrderStateChange = (status: OrderStates, order_id: string) => {
        console.log(status, order_id);
        change_order_state.mutate({ status, order_id });
    }

    console.log(data);
    return (
        <div className="w-full h-full p-4 flex flex-col">
            <div className="mb-4 flex gap-1 overflow-x-auto text-white">
                <Chip onClick={() => setStatus(OrderStates.APPROVED)} active={status === OrderStates.APPROVED}>Pending</Chip>
                <Chip onClick={() => setStatus(OrderStates.ACCEPTED)} active={status === OrderStates.ACCEPTED}>Ongoing</Chip>
                <Chip onClick={() => setStatus(OrderStates.COMPLETED)} active={status === OrderStates.COMPLETED}>Completed</Chip>
                <Chip onClick={() => setStatus(OrderStates.REJECTED)} active={status === OrderStates.REJECTED}>Rejected</Chip>
            </div>
            <div className="flex flex-col gap-4 flex-grow overflow-x-auto">
            {
                    data && data.map((order) => { return <OrderElement item={order.item_name} number={order.number} quantity={order.quantity} total={order.total} delivery_date={order.delivery_date.seconds} state={order.status} /> })
                }
            </div>
        </div>
    )
}