import { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const TitleAndBioForm = () => {
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleUpdateClick = () => {
    // Implement your update logic here
    console.log("Title:", title);
    console.log("Bio:", bio);
    // Call the necessary functions to update the title and bio in the database
    // For example: updateTitleAndBio(user.uid, title, bio);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "0" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <FormControl sx={{ margin: "10px" }}>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <FormControl sx={{ margin: "10px" }}>
          <TextField
            id="bio"
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={handleBioChange}
          />
        </FormControl>
      </Box>
      <Button
        sx={{ textTransform: "none", height: "30px", margin: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleUpdateClick}
      >
        Update
      </Button>
    </Box>
  );
};

export default TitleAndBioForm;
