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
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    backgroundImage:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))",
    display: "flex",
  };

  return (
    <Container
      maxWidth="100vw"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "700" }}
      >
        Your Link-Sync
      </Typography>
      <Typography variant="body1" gutterBottom>
        Share multiple links with just one URL!
      </Typography>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Get Started
      </Button>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "30px" }}
      >
        <Grid item xs={12} sm={7}>
          <Card elevation={3} style={cardStyle}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
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

        <Grid item xs={12} sm={7}>
          <Card elevation={3} style={cardStyle}>
            <UniqueLinkSVG />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
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
        <Grid item xs={12} sm={7}>
          <Card elevation={3} style={cardStyle}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Analytics
              </Typography>
              <Typography variant="body2">
                Get daily, monthly, weakly and lifetime profile vists,
                performance of every link
              </Typography>
            </Box>
            <AnalyticsSVG />
          </Card>
        </Grid>

        <Grid item xs={12} sm={7}>
          <Card elevation={3} style={cardStyle}>
            <CustomDomainSVG />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" gutterBottom>
                Custom Domain
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
