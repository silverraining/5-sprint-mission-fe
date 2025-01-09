import ProductItem from "shared/ProductItem";
import GetProducts from "features/ProductGeneral/api/GetProducts";
import { useEffect, useState } from "react";
import "./index.css";

const ProductBest = ({ bestColumns }) => {
  // console.log("start in best");
  const [products, setProducts] = useState([]);

  const getProducts = async ({}) => {
    const data = await GetProducts({
      page: 1,
      pageSize: bestColumns,
      orderBy: "favorite",
    });

    const list = [...data.list];
    setProducts(list);
    return data;
  };

  // console.log("start in best >> before useEffect");
  useEffect(() => {
    // console.log("in best :: " + bestColumns);
    getProducts({});
  }, [bestColumns]);

  return (
    <div className="product__best">
      <h1>베스트 상품</h1>
      <div className="best-wrapper">
        {products.slice(0, bestColumns).map((p) => (
          <ProductItem
            key={p.id}
            name={p.name}
            price={p.price}
            images={p.images}
            favoriteCount={p.favoriteCount}
          ></ProductItem>
        ))}
      </div>
    </div>
  );
};

export default ProductBest;
