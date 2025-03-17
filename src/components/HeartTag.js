import instance from "@/services/api/axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeartTag({ product }) {
  console.log("initial product: ", product);

  // 상태 초기화
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await instance.get(`/products/${product.id}`);
        setUpdatedProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [product.id]);

  const toggleLike = async (e) => {
    e.preventDefault();

    try {
      if (updatedProduct.isFavorite) {
        await instance.delete(`/products/${product.id}/favorite`);
      } else {
        await instance.post(`/products/${product.id}/favorite`);
      }

      const { data } = await instance.get(`/products/${product.id}`);
      setUpdatedProduct(data);
    } catch (error) {
      console.error(
        "좋아요 처리 실패:",
        error.response?.data?.message || error
      );
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className="flex items-center h-full bg-[#fcfcfc] border px-3 py-2 cursor-pointer rounded-full"
    >
      <Image
        src={updatedProduct.isFavorite ? "/ic_favorite.svg" : "/ic_heart.svg"}
        width={24}
        height={24}
        alt="Heart Icon"
      />
      <span className="text-[#6B7280] text-[16px] ml-1">
        {updatedProduct.favoriteCount}
      </span>
    </button>
  );
}
