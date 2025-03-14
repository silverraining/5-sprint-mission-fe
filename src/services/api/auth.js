import instance from "./axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log("BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
export const signUp = (userData) => {
  console.log("요청 URL:", `${BASE_URL}/auth/signUp`);
  console.log("요청 데이터:", userData);

  return instance.post(`${BASE_URL}/auth/signUp`, userData);
};

export const signIn = (userData) => {
  return instance.post(`${BASE_URL}/auth/signIn`, userData);
};
