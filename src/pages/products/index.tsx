import { collection, endAt, getDocs, limit, orderBy, query, startAt, where } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DB } from "../../firebase";
import { addToItems, selectCurrentProduct } from "../../redux/product-store";

export function Products() {
    const [searchText, setSearchText] = useState<string>("");
    const [products, setProducts] = useState<any>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onInput = (text: string) => {
        setSearchText(text);
        get_products(text.toLowerCase());
    }

    const get_products = async (text: string) => {
        try {
            let prod_ref = collection(DB, "products");
            let q = query(prod_ref, where('s_name', '>=', text), where('s_name', '<=', text + '\uf8ff'),limit(10))
            let docs = await getDocs(q);
            let data = docs.docs.map(d => { return { ...d.data(), id: d.id } });
            
            console.log(data);
            setProducts(data);
        } catch (e) {
            console.error(e);
        }
    }

    const on_product_clicked = (data: any) => {
        navigate("/order", { state: data })
    }

    return (
        <div className="w-screen h-screen p-2">
            {/* Select products */}
            <SearchBar value={searchText} onChange={onInput} onClickSearch={() => get_products("")} />
            <div className="overflow-y-auto grid grid-cols-2 gap-2">
                {products.map((product: any, index: number) => <Product key={index} name={product.name} onClick={() => on_product_clicked(product)} />)}
            </div>
        </div>
    )
}

interface ProductProps extends React.HTMLProps<HTMLDivElement> {
    name?: string;
}

function Product({ name, ...rest }: ProductProps) {
    return (
        <div {...rest} className="relative flex flex-col items-center min-w-[15em] p-4 border-2 border-[#0097d4] rounded-lg mb-2">
            <div className="w-[10em] h-[10em]">
                <img src="https://st2.depositphotos.com/1029541/6378/i/600/depositphotos_63780727-stock-photo-bags-of-cement.jpg" alt="" className="w-full h-full object-contain" />
            </div>
            <div>{ name }</div>
            <div>Ordinary Portland Cement Type</div>
            <AiOutlinePlus className="absolute right-0 top-0 p-1 m-1 cursor-pointer" size={42}/>
        </div>
    )
}

interface SearchbarProps {
    value?: string;
    onChange?: (val: string) => void;
    onClickSearch?: () => void;
}

function SearchBar({ value, onChange, onClickSearch }: SearchbarProps) {
    const onSubmit = (e: any) => {
        e.preventDefault();
        onClickSearch && onClickSearch();
    }

    return (
        <div className="w-full mb-2">
            <form onSubmit={onSubmit}>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" id="default-search" value={value} onChange={(e) => { onChange && onChange(e.target.value) }} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Items..." />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
    )
}