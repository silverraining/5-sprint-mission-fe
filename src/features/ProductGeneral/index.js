import ProductItem from "shared/ProductItem";
import GetProducts from "./api/GetProducts";
import Pages from "./ui/Pages";
import Button from "shared/buttons/Button";
import SelectBox from "shared/SelectBox";
import { useEffect, useState } from "react";
import ic_search from "app/assets/icon/ic_search.png";
import "./index.css";

const ProductGeneral = ({ productSize }) => {
  const [pageSize, setPageSize] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [orderBy, setOrderBy] = useState("recent");

  const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
    const data = await GetProducts({ page, pageSize, orderBy, keyword });
    setProducts([...data.list]);
    setPageSize(data.totalCount);
    return data;
  };

  useEffect(() => {
    getProducts({});
  }, []);

  useEffect(() => {
    getProducts({ orderBy, keyword: inputValue });
  }, [inputValue, orderBy]);

  return (
    <div className="product__general">
      <div className="general-filter">
        <h1>판매 중인 상품</h1>
        <div className="filter-wrapper">
          <img src={ic_search}></img>
          <input
            value={inputValue}
            placeholder="검색할 상품을 입력해주세요"
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <Button size={"sm-42"}>상품 등록하기</Button>
          <SelectBox
            orderBy={orderBy}
            handleOrderBy={(o) => setOrderBy(o)}
          ></SelectBox>
        </div>
      </div>
      <div className="general-wrapper">
        {products.slice(0, 2 * productSize).map((p) => (
          <ProductItem
            key={p.id}
            name={p.name}
            price={p.price}
            images={p.images}
            favoriteCount={p.favoriteCount}
          ></ProductItem>
        ))}
      </div>
      <Pages changePage={(p) => setPage(p)} pageSize={pageSize}></Pages>
    </div>
  );
};

export default ProductGeneral;
