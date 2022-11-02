import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  AiFillQuestionCircle,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { changeState } from "../../../api";
import { SearchBar } from "../../../components/searchbar";
import { DBCollections, OrderStates } from "../../../definitions";
import { DB } from "../../../firebase";
import { toDateOnly } from "../../../utils/date-time";
import { capitalFirstLetter } from "../../../utils/text";

export default function Orders() {
  const query_client = useQueryClient();
  const getAllOrders = async ({
    queryKey,
  }: {
    queryKey: QueryKey;
  }): Promise<any[]> => {
    const [_, status] = queryKey;
    console.log(status);
    const ordersRef = collection(DB, DBCollections.ORDERS);
    const q = query(ordersRef, where("status", "==", status));

    let data = await getDocs(q);

    // Maps are used to cache data
    let bank_map = new Map();
    let site_map = new Map();
    let product_map = new Map();

    let transformed = [];

    for (const d of data.docs) {
      // Join bank collections
      let doc_data = d.data();

      // Set ID
      doc_data.id = d.id;

      if (bank_map.has(doc_data.bank_account)) {
        doc_data.bank_name = bank_map.get(doc_data.bank_account).name;
      } else {
        const bank = await getDoc(
          doc(DB, DBCollections.BANK_ACCOUNTS, doc_data.bank_account)
        );
        const bank_data: any = bank.data();
        bank_map.set(doc_data.bank_account, bank_data);
        console.log(bank_data, doc_data.bank_account);
        doc_data.bank_name = bank_data.name;
      }

      // Join site collection
      if (site_map.has(doc_data.site)) {
        doc_data.site_name = site_map.get(doc_data.site).name;
      } else {
        const site = await getDoc(doc(DB, DBCollections.SITES, doc_data.site));
        const site_data: any = site.data();
        console.log(site_data);
        site_map.set(doc_data.site, site_data);
        doc_data.site_name = site_data.name;
      }

      // Join item collection
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

      transformed.push(doc_data);
    }

    console.log(transformed);
    return transformed;
  };

  const { mutate } = useMutation(changeState, {
    onSuccess: () => {
      query_client.invalidateQueries(["orders"]);
    },
  });

  const [status, setStatus] = useState<OrderStates>(OrderStates.PENDING);
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    ["orders", status],
    getAllOrders
  );
  
  const show_column = status != OrderStates.APPROVED;

  return (
    <div className="w-full h-full">
      <div className="flex flex-row items-center px-6">
        <div className="mr-2s">{capitalFirstLetter(status)}</div>
        <div className="w-[18em] px-3">
          <SearchBar slim />
        </div>
        <div className="flex-grow"></div>
        <div className="w-[10em]">
          <select
            id="status"
            onChange={(e) => {
              setStatus(e.target.value as OrderStates);
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected value={OrderStates.PENDING}>
              Pending
            </option>
            <option value={OrderStates.APPROVED}>Approved</option>
            <option value={OrderStates.DECLINED}>Declined</option>
            <option value={OrderStates.ACCEPTED}>Accepted</option>
            <option value={OrderStates.RETUREND}>Returned</option>
            <option value={OrderStates.REJECTED}>Rejected</option>
            <option value={OrderStates.COMPLETED}>Completed</option>
          </select>
        </div>
        <div className="p-2">
          <AiFillQuestionCircle size={50} color="#25b7d3" />
        </div>
      </div>
      <div className="p-4 flex justify-center items-center">
        {(isLoading || isFetching) && (
          <div className="flex flex-col justify-center items-center">
            Querying the Orders{" "}
            <img
              className="mt-4 h-10"
              src="/loading-gif.gif"
              alt="loading"
            ></img>
          </div>
        )}
        {isSuccess && data.length == 0 && !isFetching ? (
          <div>Nothing to show here</div>
        ) : (
          ""
        )}
        {isSuccess && data.length > 0 && !isFetching && (
          <table>
            <tr>
              <th className="font-normal px-4">#</th>
              <th className="font-normal px-4">Site Name</th>
              <th className="font-normal px-4">Site Manager</th>
              <th className="font-normal px-4">Order Item</th>
              <th className="font-normal px-4">Delivery Date</th>
              <th className="font-normal px-4">Bank Account</th>
              <th className="font-normal px-4">Total</th>
              { show_column && <th></th>}
            </tr>
            {isSuccess
              ? data.map((d, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{d.site_name}</td>
                      <td>{d.site_name}</td>
                      <td>{d.item_name}</td>
                      <td>{toDateOnly(new Date(d.delivery_date.seconds))}</td>
                      <td>{d.bank_name}</td>
                      <td>{d.total}</td>
                      {
                         show_column && <td>
                        <div className="p-1 flex">
                          <AiFillCheckCircle
                            onClick={() => {
                              mutate({
                                status: OrderStates.APPROVED,
                                order_id: d.id,
                              });
                            }}
                            size={32}
                            color="#75f94c"
                            className="mr-2 cursor-pointer"
                          />
                          <AiFillCloseCircle
                            onClick={() => {
                              mutate({
                                status: OrderStates.DECLINED,
                                order_id: d.id,
                              });
                            }}
                            size={32}
                            color="#eb3223"
                            className="cursor-pointer"
                          />
                        </div>
                      </td>
                      }
                    </tr>
                  );
                })
              : ""}
          </table>
        )}
      </div>
    </div>
  );
}
