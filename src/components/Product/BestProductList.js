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
    updateItemsPerPage(); // Update items per page on mount
    window.addEventListener("resize", updateItemsPerPage); // Add resize listener
    return () => window.removeEventListener("resize", updateItemsPerPage); // Cleanup listener
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProducts({ orderBy });

        if (Array.isArray(products)) {
          setData(products);
        } else {
          console.error(
            "API response does not contain a valid list:",
            products
          );
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
        {/* Display the products based on current itemsPerPage */}
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
