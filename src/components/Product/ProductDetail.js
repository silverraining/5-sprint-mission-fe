import ToggleDropdown from "@/components/ToggleDropdown";
import Image from "next/image";
import dayjs from "dayjs";
import HeartTag from "@/components/HeartTag"; // You can use HeartTag if you want to show favorite count or like feature
import { useRouter } from "next/router";

export default function ProductDetail({ product, onDelete }) {
  const router = useRouter();
  const username = product.username || "귀여운 판다"; // Default username if not available

  // Edit page navigation
  const handleEdit = (productId) => {
    if (productId) {
      router.push(`/marketplace/product/edit?id=${productId}`); // Navigate to the product edit page
    }
  };

  if (!product) return <div>❌ 상품 데이터를 불러오지 못했습니다.</div>;

  return (
    <section className="max-w-[1200px] mx-auto px-4 w-full">
      <div className="">
        <div className="relative w-[340px] h-[340px] border border-red-500">
          <Image
            src={
              product.images.length > 0 ? product.images[0] : "/img_default.png"
            }
            layout="fill"
            objectFit="cover"
            alt="product"
            className="rounded-xl "
          />
        </div>
        <div className="flex justify-between">
          <h2 className="font-bold text-xl whitespace-nowrap">
            {product.name}
          </h2>
          <ToggleDropdown
            onEdit={handleEdit}
            id={product.id}
            onDelete={onDelete} // Assuming you have a function to handle product deletion
          />
        </div>
        <p className="font-bold text-lg mt-2">
          {new Intl.NumberFormat().format(product.price)} 원
        </p>
        <div className="border-t border-gray-300 my-2 mb-4"></div>
        <div className="mb-6 text-[#1F2937]">
          <h2 className="font-semibold mb-3 text-sm">상품 소개</h2>
          <p className="text-[16px]">{product.description}</p>{" "}
          {/* Display product description */}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={product.imageUrl || "/ic_profile.png"} // Use the product image URL or fallback image
          width={40}
          height={40}
          alt="profile"
        />
        <span>{username}</span>
        <span className="text-[#4B5563] font-medium">
          {dayjs(product.createdAt).format("YYYY.MM.DD")}
        </span>
        <div className="border-l border-gray-300 mx-2 h-8"></div>
        <HeartTag favoriteCnt={product.favoriteCnt} />{" "}
        {/* If you want to show the favorite count */}
      </div>
      <div className="border-t border-gray-300 my-2 mb-4"></div>
    </section>
  );
}
