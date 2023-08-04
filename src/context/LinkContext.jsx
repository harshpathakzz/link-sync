import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  createLink,
  deleteLink,
  updateLink,
  getLinksByUserId,
  changeLinkVisibility,
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
  }, [user]);

  const handleCreateNewLink = async (title, url) => {
    try {
      const linkId = await createLink(user.uid, title, url);
      setLinks((prevLinks) => [
        ...prevLinks,
        { linkId, title, url, visibility: true },
      ]);
      return linkId;
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
      return true;
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleVisibilityChange = async (linkId, visibility) => {
    try {
      await changeLinkVisibility(linkId, visibility);
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.linkId === linkId ? { ...link, visibility } : link
        )
      );
    } catch (error) {
      console.error("Error changing link visibility:", error);
    }
  };

  return (
    <LinkContext.Provider
      value={{
        links,
        handleCreateNewLink,
        handleUpdateExistingLink,
        handleDeleteExistingLink,
        handleVisibilityChange,
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
