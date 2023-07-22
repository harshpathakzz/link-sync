import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const EditModal = ({ open, onClose, link, handleSaveChanges }) => {
  const [editedTitle, setEditedTitle] = useState(link.title);
  const [editedUrl, setEditedUrl] = useState(link.url);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleUrlChange = (event) => {
    setEditedUrl(event.target.value);
  };

  const handleSave = () => {
    handleSaveChanges(link.linkId, editedTitle, editedUrl);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          minWidth: 300,
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          align="center"
          gutterBottom
        >
          Edit Link
        </Typography>
        <TextField
          label="Title"
          value={editedTitle}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="URL"
          value={editedUrl}
          onChange={handleUrlChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
