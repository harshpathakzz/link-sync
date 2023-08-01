import { Box, Button, Container, Typography, Stack } from "@mui/material";
import { useTitleAndBioContext } from "../context/TitleAndBioContext";
import { useLinkContext } from "../context/LinkContext";

const MobilePreview = () => {
  const { username, title, bio, profilePicURL } = useTitleAndBioContext();
  const { links } = useLinkContext();

  const phoneFrameStyles = {
    width: "280px",
    height: "500px",
    backgroundImage: "url('path_to_phone_frame_image.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    margin: "20px auto",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/link-sync-64286.appspot.com/o/images%2Fpexels-pixabay-36717.jpg?alt=media&token=56b86be4-efbc-407a-a358-97b3008ab8d0')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <Box sx={phoneFrameStyles}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://firebasestorage.googleapis.com/v0/b/link-sync-64286.appspot.com/o/images%2Fpexels-pixabay-36717.jpg?alt=media&token=56b86be4-efbc-407a-a358-97b3008ab8d0')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur(15px)",
            borderRadius: "1px solid rgba( 255, 255, 255, 0.18 )",
            padding: "20px",
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              textAlign: "center",
              color: "#fff",
            }}
          >
            {/* <UserProfileAvatar userId={userId} /> */}
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
                        sx={{
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
                        }}
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
          sx={{ marginBottom: 1, borderRadius: 10 }}
        >
          Launch site
        </Button>
      </a>
    </Box>
  );
};

export default MobilePreview;
