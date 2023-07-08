import Box from "@mui/material/Box";

const MobilePreview = () => {
  return (
    <Box
      sx={{
        width: "200px",
        height: "380px",
        backgroundColor: "#f0f0f0",
        border: "12px solid black",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#555",
        margin: "40px auto",
      }}
    >
      MobilePreview
    </Box>
  );
};

export default MobilePreview;
