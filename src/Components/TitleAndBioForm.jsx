import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useTitleAndBioContext } from "../context/TitleAndBioContext";

const TitleAndBioForm = () => {
  const { title, setTitle, bio, setBio, handleUpdateTitleAndBio } =
    useTitleAndBioContext();

  const handleUpdateClick = () => {
    // Call the function from the context to update the title and bio in the database
    handleUpdateTitleAndBio(title, bio);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "0" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <FormControl sx={{ margin: "10px" }}>
          <TextField
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Use the setter from the context
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
            onChange={(e) => setBio(e.target.value)} // Use the setter from the context
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
