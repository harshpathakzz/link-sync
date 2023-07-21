import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LinkForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    onSubmit({
      title,
      link,
    });
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
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LinkForm;
