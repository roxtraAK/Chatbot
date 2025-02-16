import { useContext } from "react";
import { AIModeContext } from "../context/AIModeContext";

export function useAIModeContext() {
  const context = useContext(AIModeContext);

  if (context === undefined) {
    throw new Error("AI Mode Context is undefined");
  }

  return context;
}
