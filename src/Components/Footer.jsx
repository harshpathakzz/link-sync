import React from "react";
import { Typography, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const handleGitHubClick = () => {
    window.open("https://github.com/harshpathakzz", "_blank");
  };

  const footerStyle = {
    position: "relative",
    bottom: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    backgroundColor: "transparent",
  };

  const textStyle = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  const iconStyle = {
    marginLeft: "8px",
    fontSize: "20px",
  };

  return (
    <Box sx={footerStyle}>
      <Typography variant="body2" onClick={handleGitHubClick} style={textStyle}>
        Made with ❤️ by Harsh Pathak
        <GitHubIcon sx={iconStyle} />
      </Typography>
    </Box>
  );
};

export default Footer;
