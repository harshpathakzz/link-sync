import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Switch from "@mui/material/Switch";

import { useLinkContext } from "../context/LinkContext";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const LinkAdminCard = ({ link }) => {
  const {
    handleVisibilityChange,
    handleUpdateExistingLink,
    handleDeleteExistingLink,
  } = useLinkContext();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = (linkId, editedTitle, editedUrl) => {
    handleUpdateExistingLink(linkId, editedTitle, editedUrl);
    handleEditModalClose();
  };

  const handleDelete = async () => {
    try {
      const success = await deleteLink(link.linkId);
      if (success) {
        console.log("Link deleted:", link.linkId);
        handleDeleteExistingLink(link.linkId);
        handleDeleteModalClose();
      } else {
        throw new Error("Failed to delete link. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <>
      <Card key={link.linkId} sx={{ marginBottom: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{link.title}</Typography>
          <Typography>{link.url}</Typography>
          <div>
            <Switch
              checked={link.visibility}
              onChange={() =>
                handleVisibilityChange(link.linkId, !link.visibility)
              }
            />
            <IconButton onClick={handleEditModalOpen}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteModalOpen}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        handleDelete={handleDelete}
      />

      <EditModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        link={link}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default LinkAdminCard;
