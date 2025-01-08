import ProductItem from "shared/ProductItem";
import GetProducts from "./api/GetProducts";
import Pages from "./ui/Pages";
import Button from "shared/buttons/Button";
import SelectBox from "shared/SelectBox";
import { useEffect, useState } from "react";
import ic_search from "app/assets/icon/ic_search.png";
import "./index.css";

const ProductGeneral = ({ generalColumns, isMobile }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  const [totalCount, setTotalCount] = useState(0);

  const getProducts = async ({ page, pageSize, orderBy, keyword }) => {
    const data = await GetProducts({ page, pageSize, orderBy, keyword });
    setProducts([...data.list]);
    setTotalCount(data.totalCount);
    return data;
  };

  useEffect(() => {
    getProducts({});
  }, []);
  useEffect(() => {
    setPage(1);
  }, [inputValue, orderBy]);
  useEffect(() => {
    getProducts({
      page,
      pageSize: 2 * generalColumns,
      orderBy,
      keyword: inputValue,
    });
  }, [inputValue, orderBy, page, generalColumns]);

  return (
    <div className="product__general">
      <div className="general-filter">
        <h1>판매 중인 상품</h1>
        <div className="filter-wrapper">
          <div className="search-wrapper">
            <img src={ic_search}></img>
            <input
              value={inputValue}
              placeholder="검색할 상품을 입력해주세요"
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
          </div>
          <SelectBox
            orderBy={orderBy}
            handleOrderBy={(o) => setOrderBy(o)}
            isMobile={isMobile}
          ></SelectBox>
          <Button size={"sm-42"}>상품 등록하기</Button>
        </div>
      </div>
      <div className="general-wrapper">
        {products.slice(0, 2 * generalColumns).map((p) => (
          <ProductItem
            key={p.id}
            name={p.name}
            price={p.price}
            images={p.images}
            favoriteCount={p.favoriteCount}
          ></ProductItem>
        ))}
      </div>
      <Pages
        page={page}
        changePage={(p) => setPage(p)}
        pageSize={2 * generalColumns}
        maxPage={Math.ceil(totalCount / (2 * generalColumns))}
      ></Pages>
    </div>
  );
};

export default ProductGeneral;
