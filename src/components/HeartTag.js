import { useState } from "react";
import instance from "@/services/api/axios";
import Image from "next/image";

export default function HeartTag({ product, initialFavoriteCount }) {
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite); // 상태로 관리
  const handleLike = async () => {
    try {
      const response = await instance.post(`/products/${product.id}/favorite`);
      if (response.status === 200) {
        setFavoriteCount((prev) => prev + 1);
        setIsFavorite(true); // 좋아요 상태 업데이트
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "이미 찜한 상품입니다."
      ) {
        // 이미 찜한 상품일 경우 처리
        console.error(error.response.data.message); // "이미 찜한 상품입니다."
      } else {
        console.error("좋아요 추가 실패:", error);
      }
    }
  };

  const handleCancelLike = async () => {
    try {
      const response = await instance.delete(
        `/products/${product.id}/favorite`
      );
      if (response.status === 200) {
        setFavoriteCount((prev) => prev - 1);
        setIsFavorite(false); // 좋아요 상태 업데이트
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "찜하지 않은 상품입니다."
      ) {
        // 찜하지 않은 상품일 경우 처리
        console.error(error.response.data.message); // "찜하지 않은 상품입니다."
      } else {
        console.error("좋아요 취소 실패:", error);
      }
    }
  };

  const toggleLike = (e) => {
    e.preventDefault();
    if (isFavorite) {
      handleCancelLike();
    } else {
      handleLike();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      className="flex items-center h-full bg-[#fcfcfc] border px-3 py-2 cursor-pointer rounded-full"
    >
      {/* 좋아요 상태에 따라 이미지 변경 */}
      <Image
        src={isFavorite ? "/ic_favorite.svg" : "/ic_heart.svg"}
        width={24}
        height={24}
        alt="Heart Icon"
      />
      <span className="text-[#6B7280] text-[16px] ml-1">{favoriteCount}</span>
    </button>
  );
}
