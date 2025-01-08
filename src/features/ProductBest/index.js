import ProductItem from "shared/ProductItem";
import "./index.css";

const ProductBest = ({ products }) => {
  return (
    <div className="product__best">
      <h1>베스트 상품</h1>
      <div className="best-wrapper">
        {products.map((p) => (
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
