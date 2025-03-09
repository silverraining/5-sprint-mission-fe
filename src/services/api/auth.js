import instance from "./axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signUp = (userData) => {
  return instance.post(`${BASE_URL}/auth/signUp`, userData);
};

export const signIn = (userData) => {
  return instance.post(`${BASE_URL}/auth/signIn`, userData);
};
