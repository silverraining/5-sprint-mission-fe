import { useRouter } from "next/router";
import { fetchProductById } from "@/services/api/products"; // Assuming this function fetches the product by ID
import ProductDetail from "@/components/Product/ProductDetail"; // The component above
import { useState, useEffect } from "react";
import { deleteProduct } from "@/services/api/products"; // Assuming this function handles product deletion
import CommentSection from "@/components/Comment/CommentSection";
import Link from "next/link";
import { TypeProvider } from "@/contexts/TypeContext";
export default function ProductDetailPage({ product, comments }) {
  const router = useRouter();
  const { id } = router.query;

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (confirm("상품을 삭제하시겠습니까?")) {
      try {
        await deleteProduct(productId); // Call your delete API
        alert("상품이 삭제되었습니다.");
        router.push("/marketplace"); // Redirect to the marketplace after deletion
      } catch (error) {
        console.error("상품 삭제 실패:", error);
        alert("상품 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (!router.isReady || !product) return <div>⏳ 페이지 로딩 중...</div>;

  return (
    <TypeProvider type="product">
      {" "}
      {/* Wrap with TypeProvider */}
      <ProductDetail product={product} onDelete={handleDelete} />
      <CommentSection
        ProductId={id}
        comments={comments}
        label="문의하기"
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이데 대한 민형사상 책임은 게시자에게 있습니다."
        type="product"
      />
      <Link
        href="/marketplace"
        className="block text-center mt-12 w-[240px] mx-auto"
      >
        <img
          src="/btn_back.svg"
          alt="목록으로 돌아가기"
          width={240}
          height={48}
          className=" cursor-pointer"
        />
      </Link>
    </TypeProvider>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params; // Get product ID from URL

  try {
    const product = await fetchProductById(id); // Fetch product data by ID
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("상품 데이터를 가져오기 실패:", error);
    return {
      props: {
        product: null,
      },
    };
  }
}
