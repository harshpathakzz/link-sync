import { useState } from "react";
import Button from "@mui/material/Button";
import LinkForm from "./LinkForm";

const LinkTab = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddLink = () => {
    setShowForm(true);
  };

  const handleSubmitLink = () => {
    // submit link
    setShowForm(false);
  };

  return (
    <div>
      <Button onClick={handleAddLink}>Add Link</Button>

      {showForm && <LinkForm onSubmit={handleSubmitLink} />}
    </div>
  );
};

export default LinkTab;
