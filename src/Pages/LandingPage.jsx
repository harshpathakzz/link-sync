import { useEffect } from "react";
import { Button, Container, Typography, Grid, Card, Box } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CustomDomainSVG } from "../assets/custom-domain.svg";
import { ReactComponent as ShareAllLinksSVG } from "../assets/share-all.svg";
import { ReactComponent as AnalyticsSVG } from "../assets/analytics.svg";
import { ReactComponent as UniqueLinkSVG } from "../assets/unique-link2.svg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUserAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/admin");
    }
  }, [isLoggedIn, navigate]);

  const cardStyle = {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundImage:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))",
    backdropFilter: "blur(10px)",
    display: "flex",
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

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} sm={6}>
          <Card elevation={3} style={cardStyle}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Paste All Links
              </Typography>
              <Typography variant="body2">
                Easily paste all your important links in one place and share
                them with others using just one URL.
              </Typography>
            </Box>
            <ShareAllLinksSVG />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={3} style={cardStyle}>
            <UniqueLinkSVG />
            <Box>
              <Typography variant="h5" gutterBottom>
                Get a Unique Link
              </Typography>
              <Typography variant="body2">
                Your Link-Sync will generate a unique link that combines all
                your shared links together.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} sm={6}>
          <Card elevation={3} style={cardStyle}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Customizable Templates
              </Typography>
              <Typography variant="body2">
                Personalize your Link-Sync with customizable templates to match
                your style and branding.
              </Typography>
            </Box>
            <AnalyticsSVG />
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={3} style={cardStyle}>
            <CustomDomainSVG />
            <Box>
              <Typography variant="h5" gutterBottom>
                Host on Custom Domain
              </Typography>
              <Typography variant="body2">
                Take full control by hosting your Link-Sync on your custom
                domain for a seamless experience.
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
