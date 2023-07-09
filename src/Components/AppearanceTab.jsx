import { useState, useEffect } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { getUsername, updateUsername } from "../functions/dbUsernameFunctions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const AppearanceTab = () => {
  const { user } = useUserAuth();
  const [avatarImage, setAvatarImage] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await getUsername(user.uid);
        setUsername(fetchedUsername);
        console.log("Username:", fetchedUsername);
      } catch (error) {
        console.error("Error fetching username:", error);
        setError("Failed to fetch username. Please try again.");
      }
    };

    fetchUsername();
  }, [user.uid]);

  const handleUploadClick = (event) => {
    // Logic to handle photo upload
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setError(null); // Clear any previous error when the input value changes
  };

  const handleUpdateClick = async () => {
    try {
      const success = await updateUsername(user.uid, username);
      if (success) {
        console.log("Username updated:", username);
      } else {
        throw new Error("Failed to update username. Please try again.");
      }
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
    <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          style={{ width: "100px", height: "100px", margin: "10px" }}
          src={avatarImage}
          alt="Avatar"
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            style={{ textTransform: "none", height: "30px", margin: "10px" }}
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
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <FormControl style={{ margin: "10px" }}>
          <TextField
            id="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </FormControl>
        <Button
          style={{ textTransform: "none", height: "30px", margin: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleUpdateClick}
        >
          Update
        </Button>
      </div>
      {error && (
        <Typography color="error" variant="body1" style={{ marginTop: "10px" }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default AppearanceTab;
