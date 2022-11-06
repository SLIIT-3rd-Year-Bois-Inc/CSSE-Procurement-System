import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { QueryKey, useQuery } from "react-query";
import { getAllOrders, updateDelivery } from "../../api";
import Chip from "../../components/chip";
import OrderElementWithDeliveries from "../../components/order-element-with-deliveries";
import OrderElement from "../../components/order-elements";
import { DBCollections, OrderStates } from "../../definitions";
import { DB } from "../../firebase";

export default function DeliveryTracking() {
    const [status, setStatus] = useState<OrderStates>(OrderStates.PENDING);
    const { data } = useQuery(["orders", status, status == OrderStates.ACCEPTED], getAllOrders);

    console.log(data);
    return (
        <div className="w-full h-full p-4 flex flex-col">
            <div className="mb-4 h-fit flex-shrink-0 flex gap-1 overflow-x-auto text-white">
                <Chip onClick={() => setStatus(OrderStates.DRAFT)} active={status === OrderStates.DRAFT}>Draft</Chip>
                <Chip onClick={() => setStatus(OrderStates.PENDING)} active={status === OrderStates.PENDING}>Pending</Chip>
                <Chip onClick={() => setStatus(OrderStates.APPROVED)} active={status === OrderStates.APPROVED}>Approved</Chip>
                <Chip onClick={() => setStatus(OrderStates.ACCEPTED)} active={status === OrderStates.ACCEPTED}>Ongoing</Chip>
                <Chip onClick={() => setStatus(OrderStates.COMPLETED)} active={status === OrderStates.COMPLETED}>Completed</Chip>
            </div>
            <div className="flex flex-col gap-4 flex-grow overflow-x-auto">
            {
                    data && data.map((order) => {
                        if(status != OrderStates.ACCEPTED) {
                            return <OrderElement siteManager order_id={order.id} item={order.item_name} number={order.number} quantity={order.quantity} state={order.status} /> 
                        }
                            return <OrderElementWithDeliveries siteManager deliveries={order.deliveries} order_id={order.id} item={order.item_name} number={order.number} quantity={order.quantity} state={order.status} /> 
                        })
                }
            </div>
        </div>
    )
}

