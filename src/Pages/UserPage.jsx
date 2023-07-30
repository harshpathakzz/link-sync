import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIdByUsername } from "../functions/dbUsernameFunctions";
import { getUserTitleAndBio } from "../functions/dbTitleBioFunctions";
import { getLinksByUserId } from "../functions/dbLinksFunctions";
import UserProfileAvatar from "../Components/UserProfileAvatar";
import Button from "@mui/material/Button";
import { Typography, Box, Container, Stack } from "@mui/material";

const ProfilePage = () => {
  const { username } = useParams();
  const [userId, setUserId] = useState(null);
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await getIdByUsername(username);
      setUserId(id);
      const { title, bio } = await getUserTitleAndBio(id);
      setTitle(title);
      setBio(bio);
      const links = await getLinksByUserId(id);
      setLinks(links);
    };
    fetchUserData();
  }, [username]);

  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="center">
        <UserProfileAvatar userId={userId} />
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {bio}
        </Typography>
      </Box>
      <Box mt={4} textAlign="center">
        <Stack spacing={2}>
          {links.map((link) =>
            link.visibility ? (
              <Button
                key={link.id}
                variant="contained"
                color="primary"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {link.title}
              </Button>
            ) : null
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default ProfilePage;
