import { useState, useEffect } from "react";
import axios from "axios";

const URL = "https://five-sprint-mission-be-zs3c.onrender.com/products";

const useItems = (searchTerm) => {
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 680) setItemsPerPage(4);
    else if (width < 1199) setItemsPerPage(6);
    else setItemsPerPage(10);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const apiEndpoint = `${URL}?page=${page}&limit=${setItemsPerPage}&orderBy=${orderBy}&keyword=${searchTerm}`;
        console.log("API 요청 URL:", apiEndpoint);
        const response = await axios.get(apiEndpoint);
        console.log("API 응답 데이터:", response.data);
        setData(response.data.products || []);
        setTotalProducts(response.data.totalProducts || 0);
      } catch (e) {
        setError(e);
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page, orderBy, itemsPerPage, searchTerm]);
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  return {
    data,
    loading,
    error,
    setItemsPerPage,
    totalPages,
    setPage,
    setOrderBy,
  };
};

export default useItems;
