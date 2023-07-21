import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import LinkForm from "./LinkForm";
import { useUserAuth } from "../context/UserAuthContext";
import { getLinksByUserId } from "../functions/dbLinksFunctions";
import LinkAdminCard from "./LinkAdminCard";

const LinkTab = () => {
  const { user } = useUserAuth();
  const [showForm, setShowForm] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const links = await getLinksByUserId(user.uid);
        console.log("Links:", links);
        setLinks(links);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  const handleAddLink = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Button onClick={handleAddLink}>Add Link</Button>

      {showForm && <LinkForm onClose={() => setShowForm(false)} />}

      {/* Render the links using LinkAdminCard */}
      <LinkAdminCard
        links={links}
        onEdit={(linkId) => console.log("Editing link with ID:", linkId)}
        onDelete={(linkId) => console.log("Deleting link with ID:", linkId)}
      />
    </div>
  );
};

export default LinkTab;
