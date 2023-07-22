import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useLinkContext } from "../context/LinkContext";

const LinkForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { handleCreateNewLink } = useLinkContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url) {
      setError("Please fill in both the title and URL fields.");
      return;
    }

    // Regular expression to check if the URL is valid
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!url.match(urlRegex)) {
      setError("Please enter a valid URL.");
      return;
    }

    try {
      const linkId = await handleCreateNewLink(title, url);
      console.log("New link added with LinkId:", linkId);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Box>
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LinkForm;
