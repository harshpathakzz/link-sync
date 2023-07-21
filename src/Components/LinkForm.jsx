// LinkForm.jsx
import { useState } from "react";
import { createLink } from "../functions/dbLinksFunctions";
import { useUserAuth } from "../context/UserAuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LinkForm = ({ onClose }) => {
  const { user } = useUserAuth();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have 'userId', 'title', and 'url' variables set
      const linkId = await createLink(user.uid, title, url);
      console.log("New link added with LinkId:", linkId);
      onClose(); // Call the callback to close the form
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

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LinkForm;
