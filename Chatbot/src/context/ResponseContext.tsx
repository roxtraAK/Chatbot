import { createContext } from "react";
import { ResponseContextType } from "../components/Content";

export const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined
);
