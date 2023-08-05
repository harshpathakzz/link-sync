import { useState } from "react";
import Button from "@mui/material/Button";
import LinkForm from "./LinkForm";
import { useLinkContext } from "../context/LinkContext";
import LinkAdminCard from "./LinkAdminCard";

const LinkTab = () => {
  const {
    state: { links },
    actions,
  } = useLinkContext();

  const [showForm, setShowForm] = useState(false);

  const handleAddLink = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Button
        onClick={handleAddLink}
        variant="contained"
        sx={{ margin: 2, borderRadius: 10, width: "50%" }}
      >
        + Add Link
      </Button>

      {showForm && <LinkForm onClose={() => setShowForm(false)} />}

      {links.map((link) => (
        <LinkAdminCard key={link.linkId} link={link} />
      ))}
    </div>
  );
};

export default LinkTab;
