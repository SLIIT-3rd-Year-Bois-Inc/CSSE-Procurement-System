import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  runTransaction,
  setDoc,
} from "firebase/firestore";
import { DB } from "../../../firebase";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updatePOdraft } from "../../../redux/product-store";
import { useLocation, useNavigate } from "react-router-dom";
import { Counters, DBCollections, OrderStates } from "../../../definitions";

const po_schema = yup.object().shape({
  item: yup.string().label("Item").required(),
  quantity: yup.number().label("Quantity").required(),
  site: yup.string().label("Site").required(),
  delivery_date: yup.date().label("Delivery Date").required(),
  bank_account: yup.string().label("Bank Account").required(),
  note: yup.string().label("Note").required(),
});

interface ErrorContainerProps {
  children: string;
}

const ErrorContainer = ({ children }: ErrorContainerProps) => {
  return <div className="p-1 text-red-500">{children}</div>;
};

export default function PurchaseOrder() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(po_schema),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [selected_product, setSelectedProduct] = useState<any>(null);

  const dispatch = useDispatch();
  const order_state = useSelector((state: any) => state.product.draft);
  // console.log(order_state);
  useEffect(() => {
    reset(order_state);
    setSelectedProduct(location.state as any);
    watch((data, attr) => {
      dispatch(updatePOdraft(data));
    });
  }, []);

  useEffect(() => {
    selected_product &&
      selected_product.id &&
      setValue("item", selected_product.id);
  }, [selected_product]);

  const submit = async (data: any, draft: boolean) => {
    if (selected_product.price) {
      // Calculate total
      data.total = selected_product.price * data.quantity;

      if (!draft) {
        // Set default state
        data.status = OrderStates.PENDING;
      } else {
        data.status = OrderStates.DRAFT;
      }

      if (data.total < 100000 && !draft) {
        data.status = OrderStates.APPROVED;
      }

      await runTransaction(DB, async (transaction) => {
        const counter_ref = doc(
          DB,
          DBCollections.COUNTERS,
          Counters.ORDER_COUNTER
        );
        let counter_doc = await transaction.get(counter_ref);
        let new_doc_ref = doc(collection(DB, DBCollections.ORDERS));

        if (!counter_doc.exists()) {
          await transaction.set(counter_ref, { count: 1 });
        }

        let new_count = 1;
        let counter_data = counter_doc.data();
        if (counter_data) {
          new_count = counter_data.count + 1;
        }

        await transaction.update(counter_ref, { count: new_count });

        data.number = new_count;

        await transaction.set(new_doc_ref, data);
      });

      dispatch(updatePOdraft({}));
      reset({});
      console.log("submit");
      navigate("/delivery-tracking");
      // TODO - Navigate somewhere
    }
  };

  const getSites = async () => {
    let sitesRef = collection(DB, "sites");
    let sites = await getDocs(sitesRef);

    return sites.docs.map((doc) => {
      return { ...(doc.data() as any), id: doc.id };
    });
  };

  const getAccounts = async () => {
    let accountsRef = collection(DB, "bank_accounts");
    let accounts = await getDocs(accountsRef);
    return accounts.docs.map((doc) => {
      return [doc.data().name, doc.id];
    });
  };

  let site_query = useQuery(["sites"], getSites);
  let accounts_query = useQuery(["accounts"], getAccounts);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="p-4 w-full">
      <div className="font-bold">Items</div>
      <div>
        <label
          htmlFor="item"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Item
        </label>
        <select
          value={
            selected_product && selected_product.id ? selected_product.id : ""
          }
          id="item"
          required
          {...register("item")}
          onClick={() => navigate("/products")}
          className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {selected_product && selected_product.id ? (
            <option selected value={selected_product.id}>
              {selected_product.name}
            </option>
          ) : (
            <option selected value="">
              Select
            </option>
          )}
        </select>
        <ErrorContainer>{errors.item?.message as string}</ErrorContainer>
        <div className="flex flex-row">
          <div className="mr-3">
            <label
              htmlFor="quantity"
              className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              {...register("quantity")}
              defaultValue={1}
              placeholder="Quantity"
              className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <ErrorContainer>
              {errors.quantity?.message as string}
            </ErrorContainer>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Total Price
            </label>
            <input
              type="text"
              value={
                watch("quantity") *
                (selected_product ? selected_product.price : 0)
              }
              id="price"
              className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price"
            />
          </div>
        </div>

        <label
          htmlFor="description"
          className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Description
        </label>
        <textarea
          disabled
          id="description"
          value={
            selected_product ? selected_product.description : "No description"
          }
          placeholder="Description"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-[#0097d4] mb-3 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        <div className="mb-3 ml-2" onClick={() => navigate("/products")}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mr-2">
            Set / Change Item
          </button>
        </div>
      </div>
      <div className="font-bold mb-2">Site</div>
      <div className="mb-4">
        {site_query.isSuccess ? (
          <select
            id="countries"
            {...register("site")}
            className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select a Site</option>
            {site_query.data
              ? site_query.data.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))
              : null}
          </select>
        ) : null}
        <ErrorContainer>
          {site_query.isError
            ? "There was a error fetching site. Please Reload"
            : (errors.site?.message as string)}
        </ErrorContainer>
      </div>
      {/* <div className="font-bold mb-2">Storage Unit</div>
            <div className="mb-4">
                <select id="unit" {...register("storage_unit")} className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select a available unit</option>
                </select>
                <ErrorContainer>{errors.storage_unit?.message as string}</ErrorContainer>
            </div> */}
      {/* <div className="font-bold mb-2">Supplier</div>
            <div className="mb-4">
                <select id="supplier" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Supplier</option>
                </select>
            </div> */}
      <div className="font-bold mb-2">Delivery Date</div>
      <div className="mb-4">
        <input
          type="date"
          required
          id="first_name"
          {...register("delivery_date")}
          className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Delivery Date"
        />
        <ErrorContainer>
          {errors.delivery_date?.message as string}
        </ErrorContainer>
      </div>
      <div className="font-bold mb-2">Bank Account</div>
      <div className="mb-4">
        {site_query.isSuccess ? (
          <select
            id="bank_account"
            {...register("bank_account")}
            className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select a Account</option>
            {accounts_query.data
              ? accounts_query.data.map((d) => (
                  <option key={d[1]} value={d[1]}>
                    {d[0]}
                  </option>
                ))
              : null}
          </select>
        ) : null}
        <ErrorContainer>
          {accounts_query.isError
            ? "There was a error fetching accounts. Please Reload"
            : (errors.bank_account?.message as string)}
        </ErrorContainer>
      </div>
      <div className="font-bold mb-2">Note</div>
      <div className="mb-4">
        <textarea
          id="message"
          {...register("note")}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-[#0097d4] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Note"
        ></textarea>
        <ErrorContainer>{errors.note?.message as string}</ErrorContainer>
      </div>
      <div></div>
      <div className="flex justify-center items-center flex-col">
        <div className="mb-2">
          <button
            onClick={() => {
              reset();
              dispatch(updatePOdraft({}));
            }}
            className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white bg-white font-bold py-2 px-7 mr-2 rounded-2xl"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit((data) => submit(data, true))}
            className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white font-bold py-2 px-7 rounded-2xl"
          >
            Draft
          </button>
        </div>
        <button
          onClick={handleSubmit((data) => submit(data, false))}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl"
        >
          Add Order
        </button>
      </div>
    </form>
  );
}
