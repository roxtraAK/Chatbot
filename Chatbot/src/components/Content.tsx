import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";
import Chatbot from "./Chatbot";
import { ResponseContext } from "../context/ResponseContext";
import { useState } from "react";

export interface ResponseContextType {
  response: string;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
}

export default function Content() {
  const [response, setResponse] = useState<string>("");

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      <Box
        display="flex"
        sx={{ overflow: "hidden", width: "100vw", height: "100vh" }}
      >
        <Box sx={{ width: "250px", flexShrink: 0, backgroundColor: "#f4f4f4" }}>
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
  );
}
