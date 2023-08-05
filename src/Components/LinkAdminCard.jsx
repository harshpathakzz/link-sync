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
import { Box } from "@mui/material";

const LinkAdminCard = ({ link }) => {
  const { actions } = useLinkContext();

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
    actions.handleUpdateExistingLink(linkId, editedTitle, editedUrl);
    handleEditModalClose();
  };

  const handleDelete = async () => {
    try {
      const success = await actions.handleDeleteExistingLink(link.linkId);
      if (success) {
        console.log("Link deleted:", link.linkId);
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
      <Card key={link.linkId} sx={{ margin: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "space-between",
            flexDirection: "column",
            flexWrap: "wrap",
            "& .MuiTypography-root": {
              flexBasis: "50%",
              marginBottom: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              "&:hover": {
                whiteSpace: "normal",
                wordBreak: "break-all",
                overflowWrap: "break-word",
              },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box
              sx={{
                flex: "1 1 auto",
                minWidth: 0,
              }}
            >
              <Typography variant="h5">{link.title}</Typography>
              <Typography variant="body2">{link.url}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minWidth: "120px",
              }}
            >
              <Switch
                checked={link.visibility}
                onChange={() =>
                  actions.handleVisibilityChange(link.linkId, !link.visibility)
                }
              />
              <IconButton onClick={handleEditModalOpen}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDeleteModalOpen}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
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
