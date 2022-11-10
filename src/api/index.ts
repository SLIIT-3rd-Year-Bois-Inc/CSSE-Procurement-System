import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { QueryKey } from "react-query";
import { DBCollections, DeliveryStates } from "../definitions";
import { OrderDoesNotExist } from "../errors";
import { DB } from "../firebase";

export const getAllOrders = async ({ queryKey }: { queryKey: QueryKey }) => {
  let orderRef = collection(DB, DBCollections.ORDERS);
  let [_, state, resolve_deliveries] = queryKey;

  let q = query(orderRef, where("status", "==", state));
  let res = await getDocs(q);
  let new_data = [];
  let product_map = new Map();

  // Merge Items to query
  for (const docc of res.docs) {
    let doc_data = docc.data();
    doc_data.id = docc.id;

    if (product_map.has(doc_data.item)) {
      doc_data.item_name = product_map.get(doc_data.item).name;
    } else {
      const item = await getDoc(doc(DB, DBCollections.PRODUCTS, doc_data.item));
      const item_data: any = item.data();
      // console.log(item_data);
      product_map.set(doc_data.item, item_data);
      doc_data.item_name = item_data.name;
    }
    if (resolve_deliveries) {
      // Resolve Deliveries
      const delivery_ref = collection(
        DB,
        DBCollections.ORDERS,
        docc.id,
        DBCollections.DELIVERIES
      );

      let delivery_docs = await getDocs(delivery_ref);

      doc_data.deliveries = [];

      for (const d of delivery_docs.docs) {
        let delivery = d.data();
        delivery.id = d.id;
        doc_data.deliveries.push(delivery);
      }
    }
    new_data.push(doc_data);
  }

  return new_data;
};

export const changeState = async (data: {
  order_id: string;
  status: string;
}) => {
  const docRef = doc(DB, DBCollections.ORDERS, data.order_id);
  await updateDoc(docRef, {
    status: data.status,
  });
};

export const getOrder = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<DocumentData> => {
  const [_, order_id] = queryKey as any;

  const document = doc(DB, DBCollections.ORDERS, order_id);
  const data = (await getDoc(document)).data();

  if (!data) {
    throw new OrderDoesNotExist();
  }

  // Merge with item
  try {
    const item = doc(DB, DBCollections.PRODUCTS, data.item);
    console.log("check no item");
    const item_data = (await getDoc(item)).data();

    console.log(item_data, "no item");
    if (!item_data) {
      data.item_name = "[Item Does not exist anymore]";
      return data;
    }

    // Resolve delivery data
    const supplier = doc(DB, DBCollections.SUPPLIERS, item_data.supplier_id);
    let sup_doc = await getDoc(supplier);
    let sup_data = sup_doc.data();

    if (!sup_data) {
      data.supplier = {};
    } else {
      data.supplier = sup_data;
    }

    data.item_name = item_data.name;
  } catch (e) {
    console.error(e);
    data.item_name = "[Error fetching item name]";
  }

  // Get all deliveries
  const delivery_ref = collection(
    DB,
    DBCollections.ORDERS,
    order_id,
    DBCollections.DELIVERIES
  );

  let delivery_docs = await getDocs(delivery_ref);

  data.deliveries = [];

  for (const d of delivery_docs.docs) {
    data.deliveries.push(d.data());
  }

  return data;
};

export const addDelivery = async (data: any) => {
  let delivery_ref = collection(
    DB,
    DBCollections.ORDERS,
    data.order_id,
    DBCollections.DELIVERIES
  );
  await addDoc(delivery_ref, data);
};

export const updateDelivery = async (data: {
  order_id: string;
  delivery_id: string;
  data: any;
}) => {
  console.log("update", data);
  let delivery_ref = doc(
    DB,
    DBCollections.ORDERS,
    data.order_id,
    DBCollections.DELIVERIES,
    data.delivery_id
  );
  await updateDoc(delivery_ref, data.data);
};

export const updateOrder = async (data: { order_id: string; data: any }) => {
  let delivery_ref = doc(DB, DBCollections.ORDERS, data.order_id);
  await updateDoc(delivery_ref, data.data);
};
