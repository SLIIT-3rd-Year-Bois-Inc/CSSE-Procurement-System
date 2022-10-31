import React from "react";

export default function PurchaseOrder() {
    return (
        <div className="grid p-4">
            <div className="font-bold">Items</div>
            <div>
                <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Item</label>
                <select id="item" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select</option>
                </select>
                <div className="flex flex-row">
                    <div className="mr-3">
                        <label htmlFor="quantity" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                        <input type="text" id="quantity" placeholder="Quantity" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                        <input type="text" id="price" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required />
                    </div>
                </div>

                <label htmlFor="description" className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
                <textarea id="description" placeholder="Description" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-[#0097d4] mb-3 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                <div className="mb-3 ml-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mr-2">View Item</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl">Add Item</button>
                </div>
            </div>
            <div className="font-bold mb-2">Site</div>
            <div className="mb-4">
                <select id="countries" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select a Site</option>
                </select>
            </div>
            <div className="font-bold mb-2">Storage Unit</div>
            <div className="mb-4">
                <select id="unit" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select a available unit</option>
                </select>
            </div>
            {/* <div className="font-bold mb-2">Supplier</div>
            <div className="mb-4">
                <select id="supplier" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Supplier</option>
                </select>
            </div> */}
            <div className="font-bold mb-2">Delivery Date</div>
            <div className="mb-4">
                <input type="date" id="first_name" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Delivery Date" required />
            </div>
            <div className="font-bold">Total</div>
            <div className="mb-4">
                <input type="text" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Total" required />
            </div>
            <div className="font-bold mb-2">Bank Account</div>
            <div className="mb-4">
                <select id="accounts" className="bg-gray-50 border border-[#0097d4] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a Account</option>
                </select>
            </div>
            <div className="font-bold mb-2">Note</div>
            <div className="mb-4">
                <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-[#0097d4] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Note"></textarea>
            </div>
            <div></div>
            <div className="flex justify-center items-center flex-col">
                <div className="mb-2">
                    <button className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white bg-white font-bold py-2 px-7 mr-2 rounded-2xl">Reset</button>
                    <button className="text-blue-500 border-2 border-[#0097d4] hover:bg-blue-700 hover:text-white font-bold py-2 px-7 rounded-2xl">Draft</button>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 mr-2 rounded-2xl">Add Order</button>
            </div>
        </div>
    )
}