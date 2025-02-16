import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Textarea from "@mui/joy/Textarea";
import { useResponseContext } from "../hooks/useResponseContext";
import { useAIModeContext } from "../hooks/useAIModeContext";
import { handleImageGenerateResponse } from "../Events/handleImageResponse";
import { handleTextGenerateResponse } from "../Events/handleTextResponse";

export default function Chatbot() {
  const { response, setResponse } = useResponseContext();
  const { isTextActive } = useAIModeContext();
  let [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const typeMessage = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      await sleep(5);
      setResponse((prev: string) => prev + text[i]);
      console.log(text[i]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key == "Enter") {
      isTextActive
        ? handleTextGenerateResponse({
            message,
            setMessage,
            setResponse,
            setIsLoading,
            typeMessage,
          })
        : handleImageGenerateResponse({
            message,
            setMessage,
            setResponse,
            setIsLoading,
          });
    }
  };

  const renderResponseWithImage = (text: string) => {
    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i;
    const match = text.match(regex);
    if (match) {
      return (
        <Box
          sx={{
            color: "white",
            minWidth: "100%",
            maxHeight: "70vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "10px",
          }}
        >
          <img src={text} style={{ minHeight: "650px", maxWidth: "100%" }} />
        </Box>
      );
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
          {isTextActive
            ? "Stellen sie eine Frage"
            : "Lassen sie sich ein Bild generieren"}
        </Box>
      ) : (
        <>
          {isTextActive ? (
            <Textarea
              sx={{
                width: "100%",
                minHeight: "70vh",
                maxHeight: "80vh",
                backgroundColor: "transparent",
                overflowY: "scroll",
                maxWidth: "100%",
                color: "white",
                "& textarea": {
                  color: "white",
                  resize: "none",
                },
              }}
              variant="plain"
              disabled
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          ) : (
            renderResponseWithImage(response)
          )}
        </>
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
          value={message}
          variant="standard"
          focused={true}
          fullWidth
          sx={{
            display: "flex",
            alignItems: "center",
            width: "50%",
            fontSize: "24px",
            marginTop: "10px",
            color: "white",
            "& input": {
              color: "white",
              fontSize: "18px",
            },
          }}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    color: "#1964AD",
                    marginRight: "2px",
                    marginBottom: "10px",
                  }}
                  onClick={() => {
                    isTextActive
                      ? handleTextGenerateResponse({
                          message,
                          setMessage,
                          setResponse,
                          setIsLoading,
                          typeMessage,
                        })
                      : handleImageGenerateResponse({
                          message,
                          setMessage,
                          setResponse,
                          setIsLoading,
                        });
                  }}
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
