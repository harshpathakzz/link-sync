import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const DeleteModal = ({ open, onClose, handleDelete }) => {
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
          Are you sure you want to delete this Link?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "error.main", color: "#fff" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
