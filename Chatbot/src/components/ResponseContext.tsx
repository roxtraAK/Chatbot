import { createContext, useContext } from "react";
import { ResponseContextType } from "./Content";

export const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined
);

export default function useResponseContext() {
  const context = useContext(ResponseContext);

  if (context === undefined) {
    throw new Error("Response Context is undefined");
  }

  return context;
}
