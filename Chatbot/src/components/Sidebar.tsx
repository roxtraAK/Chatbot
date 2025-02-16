import { Box, Button, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ImageIcon from "@mui/icons-material/Image";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useResponseContext } from "../hooks/useResponseContext";
import { useAIModeContext } from "../hooks/useAIModeContext";

export function Sidebar() {
  const { setResponse } = useResponseContext();
  const { isImageActive, isTextActive, setIsImageActive, setIsTextActive } =
    useAIModeContext();

  const handleNewChat = () => {
    setResponse("");
  };

  const handleModeChange = (mode: "image" | "text") => {
    if (mode === "image") {
      setIsImageActive(true);
      setIsTextActive(false);
    } else if (mode === "text") {
      setIsTextActive(true);
      setIsImageActive(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#171717",
        height: "100vh",
        width: "250px",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        color: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            color="inherit"
            disabled={!isTextActive}
            onClick={() => handleModeChange("image")}
            sx={{
              marginRight: -3,
              ml: -2,
              "& .MuiTouchRipple-root": {
                transform: "scale(0.6, 100%)",
              },
              "&.Mui-disabled": {
                color: "#C0C0C0",
                opacity: 0.4,
              },
            }}
          >
            <Tooltip title="Image AI">
              <ImageIcon sx={{ fontSize: 28 }} />
            </Tooltip>
          </Button>
          <Button
            color="inherit"
            disabled={!isImageActive}
            onClick={() => handleModeChange("text")}
            sx={{
              "& .MuiTouchRipple-root": {
                transform: "scale(0.6, 100%)",
              },
              "&.Mui-disabled": {
                color: "#C0C0C0",
                opacity: 0.4,
              },
            }}
          >
            <Tooltip title="Text AI">
              <FormatQuoteIcon sx={{ fontSize: 28 }} />
            </Tooltip>
          </Button>
        </Box>

        <Button color="inherit">
          <Tooltip title="Neuer Chat">
            <EditNoteIcon
              onClick={() => handleNewChat()}
              sx={{ cursor: "pointer", fontSize: 28 }}
            />
          </Tooltip>
        </Button>
      </Box>
    </Box>
  );
}
