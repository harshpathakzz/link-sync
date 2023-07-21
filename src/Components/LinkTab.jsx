// LinkTab.jsx
import { useState } from "react";
import Button from "@mui/material/Button";
import LinkForm from "./LinkForm";

const LinkTab = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddLink = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Button onClick={handleAddLink}>Add Link</Button>

      {showForm && <LinkForm onClose={handleFormClose} />}
    </div>
  );
};

export default LinkTab;
