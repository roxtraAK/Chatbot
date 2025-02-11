import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Textarea from "@mui/joy/Textarea";
import { handleCompletion } from "../KI/ai";
import useResponseContext from "../hooks/ResponseContext";

export default function Chatbot() {
  const { response, setResponse } = useResponseContext();
  let [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const typeMessage = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      await sleep(10);
      setResponse((prev: string) => prev + text[i]);
    }
  };

  const handleGenerateResponse = async (): Promise<void> => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const apiResponse = await handleCompletion(message);
      if (apiResponse && apiResponse.content) {
        for (let i = 0; i < apiResponse.content.length; i++) {
          const text = apiResponse.content[i];
          if (text) await typeMessage(text);
        }
      }
      setMessage("");
    } catch (error) {
      console.error("Fehler beim Generieren der Antwort:", error);
      setResponse(
        (prev: string) => prev + "\n\nFehler beim Generieren der Antwort."
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
      {!response ? (
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
            height: "70vh",
            maxHeight: "80vh",
            backgroundColor: "transparent",
            overflowY: "auto",
            maxWidth: "100%",
            color: "white",
            "& textarea": {
              color: "white",
              overflowY: "auto",
            },
          }}
          variant="plain"
          disabled
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
      )}
      <Box
        sx={
          !response
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
                  onClick={() => handleGenerateResponse()}
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
