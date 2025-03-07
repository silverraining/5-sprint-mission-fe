import { createContext, useContext } from "react";

const TypeContext = createContext();

export const useType = () => useContext(TypeContext);

export const TypeProvider = ({ children, type }) => {
  return <TypeContext.Provider value={type}>{children}</TypeContext.Provider>;
};
