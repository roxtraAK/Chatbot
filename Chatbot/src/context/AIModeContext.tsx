import { createContext } from "react";
import { AIModeContextType } from "../components/Content";

export const AIModeContext = createContext<AIModeContextType | undefined>(
  undefined
);
