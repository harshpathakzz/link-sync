import { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { useLinkContext } from "../context/LinkContext";
import { toast } from "sonner"; 

const LinkForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const { actions } = useLinkContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url) {
      toast.error("Please fill in both the title and URL fields.");
      return;
    }

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!url.match(urlRegex)) {
      toast.error("Please enter a valid URL.");
      return;
    }

    try {
      const linkId = await actions.handleCreateNewLink(title, url);
      console.log("New link added with LinkId:", linkId);
      toast.success("New link added successfully!"); 
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add new link."); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{ marginBottom: 2, marginLeft: 2, marginRight: 2, width: "90%" }}
      >
        <InputLabel htmlFor="title-input">Title</InputLabel>
        <Input
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl
        fullWidth
        sx={{ marginBottom: 2, marginLeft: 2, width: "90%" }}
      >
        <InputLabel htmlFor="link-input">Link</InputLabel>
        <Input
          id="link-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </FormControl>

      <Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginRight: 2, marginLeft: 2 }}
        >
          Submit
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default LinkForm;
