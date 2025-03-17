import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/services/api/products";

export default function BestProductList() {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [orderBy, setOrderBy] = useState("favorite");

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(1);
    } else if (width < 1024) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { list, totalCount } = await fetchProducts({ orderBy });

        if (Array.isArray(list)) {
          setData(list);
        } else {
          console.error("Invalid data format:", list);
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, [orderBy]);

  return (
    <div>
      <h1 className="text-2xl font-bold mt-[26px] md:px-6 mb-4">베스트 상품</h1>

      <div className="grid grid-flow-col grid-cols-1 sm:grid-cols-2 md:px-6 lg:grid-cols-4 gap-4 w-full mt-6 mb-[43px]">
        {data.length > 0 ? (
          data
            .slice(0, itemsPerPage)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <div>No products available</div> // Fallback message
        )}
      </div>
    </div>
  );
}
