import { Box, Button } from "@mui/material";
import { useTitleAndBioContext } from "../context/TitleAndBioContext";

const MobilePreview = () => {
  const navigate = useNavigate();
  const { username } = useTitleAndBioContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "380px",
          backgroundColor: "#f0f0f0",
          border: "12px solid black",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#555",
          margin: "20px auto",
        }}
      >
        MobilePreview
      </Box>
      <a href={`/${username}`} target="_blank" rel="noopener noreferrer">
        <Button variant="contained" color="primary" sx={{ marginBottom: 1 }}>
          Launch site
        </Button>
      </a>
    </Box>
  );
};

export default MobilePreview;
