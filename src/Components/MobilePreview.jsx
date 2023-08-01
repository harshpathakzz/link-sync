import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { useTitleAndBioContext } from "../context/TitleAndBioContext";
import { useLinkContext } from "../context/LinkContext";

const MobilePreview = () => {
  const { username, title, bio, profilePicURL } = useTitleAndBioContext();
  const { links } = useLinkContext();

  const pageStyles = {
    glassMorphism: true,

    boxContainer: {
      justifyContent: "center",
      minHeight: "100vh",
      backgroundImage:
        "url('https://firebasestorage.googleapis.com/v0/b/link-sync-64286.appspot.com/o/images%2Fpexels-pixabay-36717.jpg?alt=media&token=56b86be4-efbc-407a-a358-97b3008ab8d0')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    },
    container: (glassMorphism) => ({
      maxWidth: "md",
      textAlign: "center",
      height: "100vh",
      width: "100%",
      color: "#fff",
      padding: "20px",
      // Set the glass morphism styles conditionally
      boxShadow: glassMorphism
        ? "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
        : "none",
      backdropFilter: glassMorphism ? "blur(15px)" : "none",
      borderRadius: glassMorphism
        ? "1px solid rgba( 255, 255, 255, 0.18 )"
        : "none",
    }),
    button: {
      width: "85%",
      background: "rgba( 14, 8, 8, 0.8)",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
      backdropFilter: "blur(14px)",
      borderRadius: "40px",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      padding: "10px",
      color: "#fff",
      "&:hover": {
        background: "rgba( 14, 8, 8, 0.8)",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10vh",
      }}
    >
      <Box
        sx={{
          height: "80vh",
          width: "250px",
          overflow: "scroll",
          border: "12px solid black",
          borderRadius: "20px",
        }}
      >
        <Box sx={pageStyles.boxContainer}>
          <Container
            maxWidth="md"
            style={pageStyles.container(pageStyles.glassMorphism)} // Apply the glassMorphism styles here
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                alt="User Profile Picture"
                src={profilePicURL}
                sx={{ width: 50, height: 50 }}
              />
            </Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {bio}
            </Typography>
            <Box mt={4} textAlign="center">
              <Stack spacing={2} sx={{ alignItems: "center" }}>
                {links.map(
                  (link) =>
                    link.visibility && (
                      <Button
                        key={link.id}
                        variant="contained"
                        color="primary"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={pageStyles.button}
                      >
                        {link.title}
                      </Button>
                    )
                )}
              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>
      <a href={`/${username}`} target="_blank" rel="noopener noreferrer">
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 1, borderRadius: 10 }}
        >
          Launch site
        </Button>
      </a>
    </Box>
  );
};

export default MobilePreview;
