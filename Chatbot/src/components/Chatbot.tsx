import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Textarea from "@mui/joy/Textarea";
import { handleCompletion } from "../KI/ai";
import useResponseContext from "./ResponseContext";

export default function Chatbot() {
  let [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useResponseContext();

  const handleGenerateResponse = async () => {
    if (!message.trim()) return;
    setIsLoading(true);

    try {
      const response = await handleCompletion(message);
      setMessage("");

      if (response && response.content) {
        for (let i = 0; i < response.content.length; i++) {
          context?.setResponse(response.content[i]);
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      context?.setResponse(
        "Sorry, there was an error with genrating the response."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "-5vh" }}
      >
        <h1>AI Chatbot</h1>
      </Box>
      {!context?.response ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
            fontSize: "32px",
            fontFamily: "arial",
          }}
        >
          Stellen sie eine Frage
        </Box>
      ) : (
        <Textarea
          sx={{
            width: "100%",
            height: "90%",
            backgroundColor: "transparent",
            overflow: "auto",
            maxWidth: "100%",
            color: "white",
            "& textarea": {
              color: "white",
            },
          }}
          variant="plain"
          disabled
          value={context?.response}
          onChange={(e) => context?.setResponse(e.target.value)}
        />
      )}
      <Box
        sx={
          !context?.response
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "50vh",
              }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "5vh",
              }
        }
      >
        <TextField
          id="outlined-basic"
          type="text"
          multiline={true}
          value={message}
          variant="standard"
          focused={true}
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            width: "50%",
            marginTop: "10px",
            color: "white",
            "& textarea": {
              color: "white",
            },
          }} // Set text color to white
          onChange={(e) => setMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    color: "#1964AD",
                    marginRight: "2px",
                    marginBottom: "10px",
                  }}
                  onClick={handleGenerateResponse}
                  edge="end"
                  disabled={isLoading}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
