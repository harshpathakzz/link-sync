import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useTitleAndBioContext } from "../context/TitleAndBioContext";
import TitleAndBioForm from "./TitleAndBioForm";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
const AppearanceTab = () => {
  const { user } = useUserAuth();
  const { handleUploadImage, username, setUsername, handleUpdateUsername } =
    useTitleAndBioContext();
  const [avatarImage, setAvatarImage] = useState(null);
  const [error, setError] = useState(null);

  const handleUploadClick = (event) => {
    handleUploadImage(event.target.files[0]);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError(null);
  };

  const handleUpdateClick = async () => {
    try {
      await handleUpdateUsername(username);
      console.log("Username updated:", username);
    } catch (error) {
      console.error("Error updating username:", error);
      let errorMessage = "Failed to update username. Please try again.";

      if (error.message === "Username is not unique.") {
        errorMessage =
          "Username is already taken. Please choose a different username.";
      }

      setError(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Avatar
          sx={{ width: "100px", height: "100px", margin: "10px" }}
          src={avatarImage}
          alt="Avatar"
        />
        <Box>
          <Button
            sx={{ textTransform: "none", height: "30px", margin: "10px" }}
            variant="contained"
            color="primary"
            component="label"
            htmlFor="avatar-upload"
          >
            Upload Photo
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUploadClick}
            />
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          marginBottom: "20px",
          flexDirection: "column",
        }}
      >
        <FormControl sx={{ margin: "10px", width: "100%" }}>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <Button
          sx={{
            textTransform: "none",
            height: "30px",
            marginLeft: "10px",
            marginTop: "5px",
            width: "100%",
          }}
          variant="contained"
          color="primary"
          onClick={handleUpdateClick}
        >
          Update
        </Button>
      </Box>
      {error && (
        <Typography color="error" variant="body1" sx={{ marginBottom: "10px" }}>
          {error}
        </Typography>
      )}
      <TitleAndBioForm />
    </Box>
  );
};

export default AppearanceTab;
