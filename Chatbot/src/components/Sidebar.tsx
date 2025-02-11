import { Box, Button, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import useResponseContext from "../hooks/ResponseContext";

export function Sidebar() {
  const { response, setResponse } = useResponseContext();

  const handleNewChat = () => {
    setResponse("");
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
        alignItems: "end",
        padding: "15px",
        color: "white",
      }}
    >
      <Button sx={{ marginTop: -2, paddingLeft: 5 }} color="inherit">
        <Tooltip title="Neuer Chat">
          <EditNoteIcon
            onClick={() => handleNewChat()}
            sx={{ cursor: "pointer", fontSize: 32 }}
          />
        </Tooltip>
      </Button>
    </Box>
  );
}
