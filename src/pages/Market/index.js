import ProductBest from "features/ProductBest";
import { useState, useEffect } from "react";
import { dummyData } from "features/ProductBest/dummy";
import ProductGeneral from "features/ProductGeneral";

const Market = () => {
  const [bestColumns, setBestColumns] = useState(0);
  const [generalColumns, setgeneralColumns] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setBestColumns(4);
        setgeneralColumns(5);
        setIsMobile(false);
      } else if (width > 743) {
        setBestColumns(2);
        setgeneralColumns(3);
        setIsMobile(false);
      } else {
        setIsMobile(true);
        setBestColumns(1);
        setgeneralColumns(2);
      }
    };

    // 초기 렌더링 및 리사이즈 이벤트 리스너 등록
    updateColumns();
    window.addEventListener("resize", updateColumns);

    // 클린업 (이벤트 리스너 제거)
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  return (
    <div>
      <ProductBest bestColumns={bestColumns}></ProductBest>
      <ProductGeneral
        productSize={generalColumns}
        isMobile={isMobile}
      ></ProductGeneral>
    </div>
  );
};

export default Market;
