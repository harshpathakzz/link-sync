import { useEffect } from "react";
import { Button, Container, Typography, Grid, Paper } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const paperStyle = {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundImage:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))",
    backdropFilter: "blur(10px)",
  };

  const emptyCardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    borderRadius: "8px",
    border: "2px dashed #ccc",
  };

  return (
    <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Login and Signup Buttons */}
      <Grid
        container
        justifyContent="flex-end"
        style={{ marginBottom: "30px" }}
      >
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" component="h1" gutterBottom>
        Your Link-Sync
      </Typography>
      <Typography variant="body1" gutterBottom>
        Share multiple links with just one URL!
      </Typography>

      {/* Feature: Paste all links */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom>
              Feature: Paste All Links
            </Typography>
            <Typography variant="body2">
              Easily paste all your important links in one place and share them
              with others using just one URL.
            </Typography>
          </Paper>
        </Grid>

        {/* Empty card component for future image */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={emptyCardStyle}>
            {/* Add any icon or image placeholder here */}
          </Paper>
        </Grid>
      </Grid>

      {/* Feature: Get a unique link */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        {/* Empty card component for future image */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={emptyCardStyle}>
            {/* Add any icon or image placeholder here */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom>
              Feature: Get a Unique Link
            </Typography>
            <Typography variant="body2">
              Your LInk-Sync will generate a unique link that combines all your
              shared links together.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Feature: Customizable templates */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom>
              Feature: Customizable Templates
            </Typography>
            <Typography variant="body2">
              Personalize your LInk-Sync with customizable templates to match
              your style and branding.
            </Typography>
          </Paper>
        </Grid>

        {/* Empty card component for future image */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={emptyCardStyle}>
            {/* Add any icon or image placeholder here */}
          </Paper>
        </Grid>
      </Grid>

      {/* Feature: Host on custom domain */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        {/* Empty card component for future image */}
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={emptyCardStyle}>
            {/* Add any icon or image placeholder here */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" gutterBottom>
              Feature: Host on Custom Domain
            </Typography>
            <Typography variant="body2">
              Take full control by hosting your LInk-Sync on your cu stom domain
              for a seamless experience.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
