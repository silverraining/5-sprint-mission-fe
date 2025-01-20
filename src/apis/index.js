// import axios from "axios";

// const URL = "https://five-sprint-mission-be-zs3c.onrender.com/products";

// const GetItemsApi = async ({
//   orderBy = "recent",
//   page = "1",
//   pageSize = "10",
//   search = "",
// }) => {
//   const apiEndpoint =
//     URL +
//     `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${search}`;

//   try {
//     const response = await axios.get(apiEndpoint);
//     console.log(response.data);
//     return response.data.list || [];
//   } catch (e) {
//     console.log("API error in GetItemsApi:", e);
//     throw e;
//   }
// };

// export default GetItemsApi;

// 데이터 가져오는 API 함수
// export const fetchItems = async () => {
//   try {
//     const response = await axios.get(
//       "https://five-sprint-mission-be-zs3c.onrender.com/products"
//     ); // 실제 엔드포인트
//     const items = response.data;

//     // 데이터를 변환하여 반환
//     return items.map((item) => ({
//       id: item.id,
//       name: item.name || "상품명 없음",
//       description: item.description || "",
//       price: item.price,
//       images: item.images || [],
//       tags: item.tags || "",
//       createdAt: new Date(item.createdAt), // 생성일을 Date 객체로 변환
//     }));
//   } catch (error) {
//     console.error("Error fetching items:", error.message);
//     throw new Error("Failed to fetch items.");
//   }
// };
