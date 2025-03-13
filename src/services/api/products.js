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
  imageUrl,
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
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
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
