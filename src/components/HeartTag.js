import { useState } from "react";
import instance from "@/services/api/axios";
import Image from "next/image";

export default function HeartTag({ productId, initialFavoriteCount }) {
  const [favoriteCount, setFavoriteCount] = useState(initialFavoriteCount);

  const handleLike = async () => {
    try {
      const response = await instance.post(`/products/${productId}/favorite`);
      if (response.status === 200) {
        setFavoriteCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("좋아요 추가 실패:", error);
    }
  };
  return (
    <button
      onClick={handleLike}
      className="flex items-center h-full bg-[#fcfcfc] border px-3 py-2 cursor-pointer rounded-full"
    >
      <Image src="/ic_heart.svg" width={24} height={24} alt="Heart Icon" />
      <span className="text-[#6B7280] text-[16px] ml-1">{favoriteCount}</span>
    </button>
  );
}
