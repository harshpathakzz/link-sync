import React from "react";
import { Typography, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const handleGitHubClick = () => {
    window.open("https://github.com/harshpathakzz", "_blank");
  };

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginTop: "auto",
      }}
    >
      <Typography
        variant="body2"
        onClick={handleGitHubClick}
        style={{ cursor: "pointer" }}
      >
        Made with ❤️ by Harsh Pathak
        <GitHubIcon sx={{ marginLeft: 1, fontSize: 20 }} />
      </Typography>
    </Box>
  );
};

export default Footer;
