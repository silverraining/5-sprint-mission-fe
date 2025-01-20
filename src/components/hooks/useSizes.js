import { useState, useEffect } from "react";
import { debounce } from "lodash";
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < breakpoint);
    }, 200); // 200ms 디바운스 적용

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export const useIsTablet = (minBreakpoint = 768, maxBreakpoint = 1024) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsTablet(
        window.innerWidth >= minBreakpoint && window.innerWidth <= maxBreakpoint
      );
    }, 200); // 200ms 디바운스 적용

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [minBreakpoint, maxBreakpoint]);

  return isTablet;
};
