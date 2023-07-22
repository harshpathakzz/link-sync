import { useState } from "react";
import Button from "@mui/material/Button";
import LinkForm from "./LinkForm";
import { useLinkContext } from "../context/LinkContext";
import LinkAdminCard from "./LinkAdminCard";

const LinkTab = () => {
  const { links } = useLinkContext();
  const [showForm, setShowForm] = useState(false);

  const handleAddLink = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Button onClick={handleAddLink}>Add Link</Button>

      {showForm && <LinkForm onClose={() => setShowForm(false)} />}

      {/* Render the links using LinkAdminCard */}
      {links.map((link) => (
        <LinkAdminCard key={link.linkId} link={link} />
      ))}
    </div>
  );
};

export default LinkTab;
