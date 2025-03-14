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
      return response.data.list;
    } else {
      console.error(
        "API response does not contain a valid list:",
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
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
    // 성공적으로 응답을 받으면 응답 데이터 출력
    console.log("상품 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    // 에러가 발생하면 에러 로그 출력
    console.error("상품 등록 에러:", error);

    // 추가적으로 서버에서 받은 에러 메시지도 출력
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
