import { Avatar, Box } from "@mui/material";

const UserProfileAvatar = ({ profilePicUrl }) => {
  const profilePicUrlState = profilePicUrl;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
      <Avatar
        alt="User Profile Picture"
        src={profilePicUrlState}
        sx={{ width: 80, height: 80 }}
      />
    </Box>
  );
};

export default UserProfileAvatar;
