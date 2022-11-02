import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { QueryKey, useQuery } from "react-query";
import Chip from "../../components/chip";
import OrderElement from "../../components/order-elements";
import { DBCollections, OrderStates } from "../../definitions";
import { DB } from "../../firebase";

export default function DeliveryTracking() {
    const [status, setStatus] = useState<OrderStates>(OrderStates.PENDING);

    const getAllOrders = async ({ queryKey }: { queryKey: QueryKey }) => {
        let orderRef = collection(DB, DBCollections.ORDERS);
        let [_, state] = queryKey;

        let q = query(orderRef, where("status", "==", state));
        let res = await getDocs(q);
        let new_data = [];
        let product_map = new Map();

        // Merge Items to query
        for (const docc of res.docs) {
            let doc_data = docc.data();
            if (product_map.has(doc_data.item)) {
                doc_data.item_name = product_map.get(doc_data.item).name;
            } else {
                const item = await getDoc(
                    doc(DB, DBCollections.PRODUCTS, doc_data.item)
                );
                const item_data: any = item.data();
                console.log(item_data);
                product_map.set(doc_data.item, item_data);
                doc_data.item_name = item_data.name;
            }
            new_data.push(doc_data);
        }

        return new_data;
    }

    const { data } = useQuery(["orders", status], getAllOrders);


    return (
        <div className="w-full h-full p-4 flex flex-col">
            <div className="mb-4 flex gap-1 overflow-x-auto text-white">
                <Chip onClick={() => setStatus(OrderStates.DRAFT)} active={status === OrderStates.DRAFT}>Draft</Chip>
                <Chip onClick={() => setStatus(OrderStates.PENDING)} active={status === OrderStates.PENDING}>Pending</Chip>
                <Chip onClick={() => setStatus(OrderStates.APPROVED)} active={status === OrderStates.APPROVED}>Approved</Chip>
                <Chip onClick={() => setStatus(OrderStates.ACCEPTED)} active={status === OrderStates.ACCEPTED}>Ongoing</Chip>
                <Chip onClick={() => setStatus(OrderStates.COMPLETED)} active={status === OrderStates.COMPLETED}>Completed</Chip>
            </div>
            <div className="flex flex-col gap-4 flex-grow overflow-x-auto">
                {
                    data && data.map((order) => { return <OrderElement item={order.item_name} number={order.number} quantity={order.quantity} total={order.total} delivery_date={order.delivery_date.seconds} state={order.status} /> })
                }
            </div>
        </div>
    )
}

