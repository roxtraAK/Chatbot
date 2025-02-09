import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";
import Chatbot from "./Chatbot";

export default function Content() {
  return (
    <Box display="flex" sx={{ width: "100vw", height: "100vh" }}>
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
  );
}
