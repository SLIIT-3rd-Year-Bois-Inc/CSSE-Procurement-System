import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/searchbar";
import { DB } from "../../firebase";
import { addToItems, selectCurrentProduct } from "../../redux/product-store";

export function Products() {
  const [searchText, setSearchText] = useState<string>("");
  const [products, setProducts] = useState<any>([]);
  const navigate = useNavigate();

  const onInput = (text: string) => {
    setSearchText(text);
    get_products(text.toLowerCase());
  };

  const get_products = async (text: string) => {
    try {
      let prod_ref = collection(DB, "products");
      let q = query(
        prod_ref,
        where("s_name", ">=", text),
        where("s_name", "<=", text + "\uf8ff"),
        limit(10)
      );
      let docs = await getDocs(q);
      let data = docs.docs.map((d) => {
        return { ...d.data(), id: d.id };
      });

      console.log(data);
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const on_product_clicked = (data: any) => {
    navigate("/order", { state: data });
  };

  return (
    <div className="w-screen h-screen p-2">
      {/* Select products */}
      <SearchBar
        value={searchText}
        className="mb-2"
        onChangeInput={onInput}
        onClickSearch={() => get_products("")}
      />
      <div className="overflow-y-auto grid grid-cols-2 gap-2">
        {products.map((product: any, index: number) => (
          <Product
            key={index}
            name={product.name}
            onClick={() => on_product_clicked(product)}
          />
        ))}
      </div>
    </div>
  );
}

interface ProductProps extends React.HTMLProps<HTMLDivElement> {
  name?: string;
}

function Product({ name, ...rest }: ProductProps) {
  return (
    <div
      {...rest}
      className="relative flex flex-col items-center min-w-[15em] p-4 border-2 border-[#0097d4] rounded-lg mb-2"
    >
      <div className="w-[10em] h-[10em]">
        <img
          src="https://st2.depositphotos.com/1029541/6378/i/600/depositphotos_63780727-stock-photo-bags-of-cement.jpg"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <div>{name}</div>
      <div>Ordinary Portland Cement Type</div>
      <AiOutlinePlus
        className="absolute right-0 top-0 p-1 m-1 cursor-pointer"
        size={42}
      />
    </div>
  );
}
