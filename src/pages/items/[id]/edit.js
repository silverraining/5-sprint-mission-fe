import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/Common/modals/Modal";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById, updateProduct } from "@/services/api/products";
import { mutation } from "@/services/api/products";
import Image from "next/image";
export default function ProductEditPage() {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (id) {
      fetchProductById(id).then((data) => {
        // 데이터가 undefined일 경우 기본값 설정
        const productData = data || {};

        setValue("name", productData.name || "");
        setValue("description", productData.description || "");
        setValue("price", productData.price || "");
        setValue("imageUrl", productData.images ? productData.images[0] : "");
        setTags(productData.tags || []);
      });
    }
  }, [id, setValue]);

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      if (data) {
        setModalMessage("상품이 성공적으로 수정되었습니다.");
        setIsModalOpen(true);
        router.push(`/items/${id}`);
      } else {
        setModalMessage("상품 수정에 실패했습니다.");
        setIsModalOpen(true);
      }
    },
    onError: (error) => {
      if (error.response) {
        //console.log("서버 응답 데이터:", error.response.data);
        setModalMessage("상품 수정에 실패했습니다.");
      } else {
        console.log("error", error);
        setModalMessage("서버와 통신할 수 없습니다.");
      }
      setIsModalOpen(true);
    },
  });

  const onSubmit = (data) => {
    const updatedData = {
      ...data,
      id: id,
      tags: tags || [], // tags가 undefined일 경우 빈 배열로
    };
    console.log("상품 수정 데이터:", updatedData);
    if (!updatedData.name || !updatedData.description || !updatedData.price) {
      console.error("필수 항목이 누락되었습니다:", updatedData);
      return;
    }

    mutation.mutate(updatedData);
  };

  // 태그 추가
  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // 태그 삭제
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-md"
      >
        <div className="w-full flex justify-between">
          <h1 className="text-2xl whitespace-nowrap font-bold mb-8">
            상품 수정하기
          </h1>
          <button
            type="submit"
            className=" bg-[#9CA3AF] mb-6 cursor-pointer text-white rounded-lg px-6 h-[42px] font-bold hover:bg-[#3692FF]"
          >
            수정
          </button>
        </div>

        {/* 상품명 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">상품명</label>
          <input
            type="text"
            {...register("name", { required: "상품명을 입력하세요." })}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="상품명을 입력하세요"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* 상품 설명 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            상품 소개
          </label>
          <textarea
            {...register("description", {
              required: "상품 소개를 입력하세요.",
            })}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="상품 소개를 입력하세요"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* 상품 가격 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">판매가격</label>
          <input
            type="number"
            {...register("price", { required: "판매가격을 입력하세요." })}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="판매가격을 입력하세요"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* 이미지 URL 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">
            이미지 URL
          </label>
          <input
            type="url"
            {...register("imageUrl", {
              required: "이미지 URL을 입력해주세요.",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "유효한 URL 형식이 아닙니다.",
              },
            })}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="이미지 URL을 입력해주세요"
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        {/* 태그 입력 */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">태그</label>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(e.target.value.trim());
                e.target.value = "";
              }
            }}
            className="w-full p-3 rounded-md focus:ring bg-[#F3F4F6] focus:ring-blue-300"
            placeholder="태그를 입력하세요"
          />
        </div>

        {/* 태그 리스트 */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full"
            >
              #{tag}
              <Image
                src="/ic_X.png"
                className="ml-2 text-red-500 cursor-pointer"
                onClick={() => removeTag(tag)}
                width={16}
                height={16}
                alt="Remove"
              />
            </span>
          ))}
        </div>
      </form>

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}
