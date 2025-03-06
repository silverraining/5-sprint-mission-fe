import instance from "@/services/api/axios";

const URL = "https://panda-market-api.vercel.app/products";

const GetProductApi = ({
  orderBy = "recent",
  page = "1",
  pageSize = "10",
  search = "",
}) => {
  const apiEndpoint =
    URL +
    `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${search}`;

  return instance
    .get(apiEndpoint)
    .then((response) => response.data.list || [])

    .catch((e) => {
      console.log("API error in GetProductApi:", e);
      throw e;
    });
};

export default GetProductApi;
