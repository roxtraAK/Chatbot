import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";
import Chatbot from "./Chatbot";
import { ResponseContext } from "../context/ResponseContext";
import { AIModeContext } from "../context/AIModeContext";
import { useState } from "react";

export interface ResponseContextType {
  response: string;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
}

export interface AIModeContextType {
  isTextActive: boolean;
  isImageActive: boolean;
  setIsTextActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Content() {
  const [response, setResponse] = useState<string>("");
  const [isTextActive, setIsTextActive] = useState<boolean>(true);
  const [isImageActive, setIsImageActive] = useState<boolean>(false);

  return (
    <AIModeContext.Provider
      value={{ isTextActive, isImageActive, setIsTextActive, setIsImageActive }}
    >
      <ResponseContext.Provider value={{ response, setResponse }}>
        <Box
          display="flex"
          sx={{ overflow: "hidden", width: "100vw", height: "100vh" }}
        >
          <Box
            sx={{ width: "250px", flexShrink: 0, backgroundColor: "#f4f4f4" }}
          >
            <Sidebar />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              padding: 2,
            }}
          >
            <Chatbot />
          </Box>
        </Box>
      </ResponseContext.Provider>
    </AIModeContext.Provider>
  );
}
