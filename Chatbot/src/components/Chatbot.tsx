import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Textarea from "@mui/joy/Textarea";
import { handleCompletion } from "../KI/ai";

export default function Chatbot() {
  let [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponseMessage] = useState<string>("");

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const typeMessage = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      await sleep(10);
      setResponseMessage((prevResponse: string) => prevResponse + text[i]);
    }
    setResponseMessage("\n");
  };

  const handleGenerateResponse = async () => {
    setIsLoading(true);
    try {
      const response = await handleCompletion(message);
      if (response && response.content) {
        for (let i = 0; i < response.content.length; i++) {
          const text = response.content[i];
          if (text) {
            await typeMessage(text);
          }
        }
      }
    } catch (error) {
      console.error("Error generating response:", error);
      setResponseMessage("Sorry, there was an error generating the response.");
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
            fontFamily: "fantasy",
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
            maxWidth: "100%",
            color: "white",
            "& textarea": {
              color: "white",
            },
          }}
          variant="plain"
          disabled
          value={response}
          onChange={(e) => setResponseMessage(e.target.value)}
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
