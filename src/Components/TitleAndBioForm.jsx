import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
            inputProps={{
              maxLength: 10, // Maximum 10 characters for title
            }}
          />
          <Typography variant="body2" color="textSecondary">
            {`${title.length}/10`}
          </Typography>
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
            inputProps={{
              maxLength: 50, // Maximum 50 characters for bio
            }}
          />
          <Typography variant="body2" color="textSecondary">
            {`${bio.length}/50`}
          </Typography>
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
