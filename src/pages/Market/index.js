import ProductBest from "features/ProductBest";
import { useState, useEffect } from "react";
import ProductGeneral from "features/ProductGeneral";

const Market = () => {
  // 초기값 계산 함수
  const getInitialColumns = () => {
    const width = window.innerWidth;
    if (width > 1200) {
      return { best: 4, general: 5, isMobile: false };
    } else if (width > 743) {
      return { best: 2, general: 3, isMobile: false };
    } else {
      return { best: 1, general: 2, isMobile: true };
    }
  };

  // 초기값 설정
  const { best, general, isMobile } = getInitialColumns();
  const [bestColumns, setBestColumns] = useState(best);
  const [generalColumns, setGeneralColumns] = useState(general);
  const [isMobileState, setIsMobileState] = useState(isMobile);

  // console.log(
  //   `start Market // general-column:${generalColumns} | best-column:${bestColumns}`
  // );

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width > 1200) {
        setBestColumns(4);
        setGeneralColumns(5);
        setIsMobileState(false);
      } else if (width > 743) {
        setBestColumns(2);
        setGeneralColumns(3);
        setIsMobileState(false);
      } else {
        setBestColumns(1);
        setGeneralColumns(2);
        setIsMobileState(true);
      }
    };

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", updateColumns);

    // 클린업 (이벤트 리스너 제거)
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  // console.log(
  //   `return before // general-column:${generalColumns} | best-column:${bestColumns}`
  // );

  return (
    <div>
      <ProductBest bestColumns={bestColumns}></ProductBest>
      <ProductGeneral
        generalColumns={generalColumns}
        isMobile={isMobileState}
      ></ProductGeneral>
    </div>
  );
};

export default Market;
