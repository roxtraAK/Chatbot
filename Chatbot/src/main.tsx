import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Content from "./components/Content.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Content />
  </StrictMode>
);
