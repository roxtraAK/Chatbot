import { useContext } from "react";
import { ResponseContext } from "../context/ResponseContext";

export default function useResponseContext() {
  const context = useContext(ResponseContext);

  if (context === undefined) {
    throw new Error("Response Context is undefined");
  }

  return context;
}
