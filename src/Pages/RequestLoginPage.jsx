import React, { useEffect } from "react";
import { Paper, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
const RequestLoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserAuth();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Please login to continue
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default RequestLoginPage;
