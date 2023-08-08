import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLinksByUserId } from "../functions/dbLinksFunctions";
import { trackUserVisit } from "../functions/dbUserAnalyticsFunctions";
import { trackLinkVisit } from "../functions/dbLinksAnalyticsFunctions";
import { getDataByUsername } from "../functions/dbFunctions";
import UserProfileAvatar from "../Components/UserProfileAvatar";
import Button from "@mui/material/Button";
import { Typography, Box, Container, Stack } from "@mui/material";

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
    maxWidth: "100vw",
    textAlign: "center",
    height: "100vh",
    width: "100%",
    color: "#fff",
    padding: "20px",
    overflow: "auto",
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
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    "&:hover": {
      whiteSpace: "normal",
      wordBreak: "break-all",
      overflowWrap: "break-word",
      background: "rgba( 14, 8, 8, 0.8)",
    },
    "@media (min-width: 700px)": {
      width: "60%",
    },
  },
};

const ProfilePage = () => {
  const { username } = useParams();
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [profilePicUrl, setProfilePicUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getDataByUsername(username);
      if (userData) {
        const { title, bio, profilePicUrl, id } = userData;
        setProfilePicUrl(profilePicUrl);
        setTitle(title);
        setBio(bio);
        const links = await getLinksByUserId(id);
        setLinks(links);
        // Check if user visit is already tracked in the session
        const isUserVisited = sessionStorage.getItem("userVisited");
        if (!isUserVisited) {
          await trackUserVisit(id);
          // Mark user visit as tracked in the session
          sessionStorage.setItem("userVisited", "true");
        }
      }
    };
    fetchUserData();
  }, [username]);

  const handleLinkClick = async (linkId) => {
    await trackLinkVisit(linkId);
  };

  return (
    <Box sx={pageStyles.boxContainer}>
      <Container
        maxWidth="md"
        style={pageStyles.container(pageStyles.glassMorphism)} // Apply the glassMorphism styles here
      >
        <UserProfileAvatar profilePicUrl={profilePicUrl} />
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
                    key={link.linkId}
                    variant="contained"
                    color="primary"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLinkClick(link.linkId)}
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
  );
};

export default ProfilePage;
