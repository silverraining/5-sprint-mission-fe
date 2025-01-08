import "./index.css";
import ic_open_seletor from "app/assets/icon/ic_open_selector.png";
import ic_select_box from "app/assets/icon/ic_select_box.png";
import { useState } from "react";

const SelectBox = ({ orderBy, handleOrderBy, isMobile }) => {
  const [isShowOption, setIsShowOption] = useState(false);

  const handleOnChangeSelectValue = (e) => {
    const value = e.target.dataset.key;
    handleOrderBy(value);
    setIsShowOption(!isShowOption);
  };

  return (
    <div className="select-box">
      <div
        className="seletor-wrapper"
        onClick={() => setIsShowOption(!isShowOption)}
      >
        {!isMobile && (
          <>
            <label>{orderBy === "recent" ? "최신순" : "좋아요순"}</label>
            <img src={ic_open_seletor} alt=""></img>
          </>
        )}
        {isMobile && <img src={ic_select_box} alt=""></img>}
      </div>
      <ul
        style={{ display: isShowOption ? "block" : "none" }}
        className="seletor-options"
      >
        <li data-key="recent" onClick={handleOnChangeSelectValue}>
          최신순
        </li>
        <li data-key="favorite" onClick={handleOnChangeSelectValue}>
          좋아요순
        </li>
      </ul>
    </div>
  );
};

export default SelectBox;
