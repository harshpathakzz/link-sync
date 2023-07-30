import { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { getProfilePicUrl } from "../functions/dbImageFunctions";

const UserProfileAvatar = ({ userId }) => {
  const [profilePicUrl, setProfilePicUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicUrl = async () => {
      const url = await getProfilePicUrl(userId);
      setProfilePicUrl(url);
    };
    fetchProfilePicUrl();
  }, [userId]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
      <Avatar
        alt="User Profile Picture"
        src={profilePicUrl}
        sx={{ width: 80, height: 80 }}
      />
    </Box>
  );
};

export default UserProfileAvatar;
