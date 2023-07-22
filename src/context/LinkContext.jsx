import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  createLink,
  getLinkById,
  deleteLink,
  updateLink,
  getLinksByUserId,
} from "../functions/dbLinksFunctions";

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const { user } = useUserAuth();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const links = await getLinksByUserId(user.uid);
        setLinks(links);
      } catch (error) {
        console.error("Error getting links by userId:", error);
      }
    };

    if (user) {
      fetchLinks();
    } else {
      setLinks([]); // Clear the links if the user is not authenticated
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCreateNewLink = async (title, url) => {
    try {
      const linkId = await createLink(user.uid, title, url);
      setLinks((prevLinks) => [...prevLinks, { linkId, title, url }]);
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };

  const handleUpdateExistingLink = async (linkId, newTitle, newUrl) => {
    try {
      await updateLink(linkId, newTitle, newUrl);
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.linkId === linkId
            ? { ...link, title: newTitle, url: newUrl }
            : link
        )
      );
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  const handleDeleteExistingLink = async (linkId) => {
    try {
      await deleteLink(linkId);
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.linkId !== linkId)
      );
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <LinkContext.Provider
      value={{
        links,
        handleCreateNewLink,
        handleUpdateExistingLink,
        handleDeleteExistingLink,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
