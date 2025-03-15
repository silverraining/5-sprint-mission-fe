import instance from "@/services/api/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite } from "@/services/api/products";
export default function HeartTag({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 초기 상품 정보에서 좋아요 상태 설정
  useEffect(() => {
    if (product) {
      setIsLiked(product.isLiked || false);
      setLikeCount(product.likeCount || 0);
    }
  }, [product]);

  const toggleLike = async (e) => {
    e.preventDefault();
    // 이미 처리 중인 경우 중복 클릭 방지
    if (isLoading) return;

    setIsLoading(true);
    try {
      // 현재 좋아요 상태에 따라 다른 API 호출
      if (isLiked) {
        // 좋아요 취소
        const result = await removeFavorite(product.id);
        setIsLiked(false);
        setLikeCount(result.likeCount);
      } else {
        // 좋아요 추가
        const result = await addFavorite(product.id);
        setIsLiked(true);
        setLikeCount(result.likeCount);
      }
    } catch (error) {
      console.error(
        "좋아요 처리 실패:",
        error.response?.data?.message || error
      );

      // 개발 환경에서 상세 오류 표시
      if (process.env.NODE_ENV === "development") {
        console.log("API 오류 상세:", {
          status: error.response?.status,
          message: error.response?.data?.message,
          error: error.message,
        });

        // 임시 UI 업데이트 (API 오류가 계속되는 경우)
        // 실제 API가 완성되기 전까지만 사용
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLike}
      disabled={isLoading}
      className={`flex items-center h-full bg-[#fcfcfc] border px-3 py-2 rounded-full
                ${isLoading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
    >
      <Image
        src={isLiked ? "/ic_favorite.svg" : "/ic_heart.svg"}
        width={24}
        height={24}
        alt="Heart Icon"
      />
      <span className="text-[#6B7280] text-[16px] ml-1">{likeCount}</span>
    </button>
  );
}
