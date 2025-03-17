import instance from "@/services/api/axios";

const BASE_URL = "https://panda-market-api.vercel.app/products";

export const fetchProducts = async ({
  orderBy = "recent",
  page = "1",
  pageSize = "10",
  search = "",
}) => {
  try {
    const apiEndpoint = `${BASE_URL}?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${encodeURIComponent(
      search
    )}`;
    const response = await instance.get(apiEndpoint);

    if (response.data && Array.isArray(response.data.list)) {
      return {
        list: response.data.list,
        totalCount: response.data.totalCount || 0, // totalCount 추가
      };
    } else {
      console.error(
        "API response does not contain a valid list:",
        response.data
      );
      return { list: [], totalCount: 0 };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { list: [], totalCount: 0 };
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await instance.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// export const toggleFavorite = async ({ productId, isFavorite }) => {
//   try {
//     // isFavorite 값을 반전시켜 서버로 보내기
//     const response = await instance.post(`${BASE_URL}/${productId}/favorite`, {
//       isFavorite: !isFavorite,
//     });
//     return response.data; // 변경된 데이터 반환
//   } catch (error) {
//     console.error("Error toggling favorite:", error);
//     throw error;
//   }
// };

export const createProduct = async ({
  name,
  description,
  price,
  images: [imageUrl],
  tags,
}) => {
  try {
    const response = await instance.post(`${BASE_URL}`, {
      name,
      description,
      price,
      images: [imageUrl], // 이미지 URL 배열로
      tags: tags,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("상품 등록 에러:", error);

    // 서버에서 받은 에러 메시지
    if (error.response) {
      console.error("서버 에러 메시지:", error.response.data);
    } else {
      console.error("네트워크 또는 다른 오류 발생:", error.message);
    }

    throw error;
  }
};

export const updateProduct = async (data) => {
  if (!data.name || !data.description || !data.price) {
    throw new Error("Missing required fields");
  }

  const { id, imageUrl, ...dataToSend } = data;

  // `imageUrl`을 `images` 배열로 감싸기
  const updatedData = {
    ...dataToSend,
    images: [imageUrl],
  };

  try {
    const response = await instance.patch(`${BASE_URL}/${id}`, updatedData);
    console.log("Updated product:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await instance.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const fetchProductComments = async (productId, limit = 10) => {
  const response = await instance.get(`${BASE_URL}/${productId}/comments`, {
    params: { limit },
  });
  return response.data;
};
