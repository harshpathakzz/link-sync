import { useState } from "react";
import { useTitleAndBioContext } from "../context/TitleAndBioContext";
import TitleAndBioForm from "./TitleAndBioForm";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "sonner"; // Import Sonner Toast

const AppearanceTab = () => {
  const {
    handleUploadImage,
    username,
    setUsername,
    handleUpdateUsername,
    profilePicURL,
  } = useTitleAndBioContext();
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
      toast.success("Username updated successfully!"); // Success toast
    } catch (error) {
      console.error("Error updating username:", error);
      let errorMessage = "Failed to update username. Please try again.";

      if (error.message === "Username is not unique.") {
        errorMessage =
          "Username is already taken. Please choose a different username.";
      }

      toast.error(errorMessage); // Error toast
      setError(errorMessage); // Optional: Keep setting error in state if needed
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        maxWidth: { xs: "100vw", sm: "70vw" },
        margin: "0", 
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          gap: "20px", 
          flexWrap: "wrap", 
        }}
      >
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
          }}
          src={profilePicURL || ""}
          alt="Avatar"
        />
        <Button
          sx={{
            textTransform: "none",
            height: "40px", 
          }}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px", 
          width: "100%", 
        }}
      >
        <FormControl>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
            sx={{
              width: "100%", 
            }}
          />
        </FormControl>
        <Button
          sx={{
            textTransform: "none",
            width: "100%",
            padding: "10px", 
          }}
          variant="contained"
          color="primary"
          onClick={handleUpdateClick}
        >
          Update
        </Button>
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <TitleAndBioForm />
      </Box>
    </Box>
  );
};

export default AppearanceTab;
