import "./index.css";
import product_default from "app/assets/images/product_default.png";
import ic_heart_empty from "app/assets/icon/ic_heart_16x16_empty.png";
import ic_heart_fill from "app/assets/icon/ic_heart_16x16_fill.png";

/* 
type : best | general
handleClick : 상품 상세 조회 동작
*/

const ProductItem = ({
  images,
  name,
  description,
  price,
  favoriteCount,
  type,
  handleClick,
}) => {
  const classNames = `product product-${type}`;
  const isDefaultImage = !Boolean(images);

  const handleError = (e) => {
    e.target.src = product_default;
    e.target.classList.add("default-img");
  };

  return (
    <div className={classNames} onClick={handleClick}>
      <div className="image-container">
        <img
          src={images || product_default}
          className={isDefaultImage ? "default-img" : ""}
          onError={(e) => handleError(e)}
        ></img>
      </div>
      <h3>{name}</h3>
      <h2>{price.toLocaleString("ko-kr")}원</h2>
      <div className="heart-container">
        <img src={ic_heart_empty}></img>
        <span>{favoriteCount}</span>
      </div>
    </div>
  );
};

export default ProductItem;
