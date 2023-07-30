import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
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
    <Avatar
      alt="User Profile Picture"
      src={profilePicUrl}
      sx={{ width: 80, height: 80 }}
    />
  );
};

export default UserProfileAvatar;
