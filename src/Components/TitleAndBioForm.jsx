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
    handleUpdateTitleAndBio(title, bio);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "0" }}>
      <FormControl sx={{ margin: "10px" }}>
        <TextField
          id="title"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{
            maxLength: 10,
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            position: "absolute",
            bottom: "0",
            right: "10px",
            fontSize: "12px",
          }}
        >
          {`${title.length}/10`}
        </Typography>
      </FormControl>
      <FormControl sx={{ margin: "10px" }}>
        <TextField
          id="bio"
          label="Bio"
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          inputProps={{
            maxLength: 50,
          }}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            position: "absolute",
            bottom: "0",
            right: "10px",
            fontSize: "12px",
          }}
        >
          {`${bio.length}/50`}
        </Typography>
      </FormControl>
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
