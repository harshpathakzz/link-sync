import { createContext, useContext, useEffect, useReducer } from "react";
import { useUserAuth } from "./UserAuthContext";
import {
  createLink,
  deleteLink,
  updateLink,
  getLinksByUserId,
  changeLinkVisibility,
} from "../functions/dbLinksFunctions";
import { linkReducer } from "./linkReducer";

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const { user } = useUserAuth();

  const initialState = {
    links: [],
  };

  const [state, dispatch] = useReducer(linkReducer, initialState);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const links = await getLinksByUserId(user.uid);
        dispatch({ type: "SET_LINKS", payload: links });
      } catch (error) {
        console.error("Error getting links by userId:", error);
      }
    };

    if (user) {
      fetchLinks();
    } else {
      dispatch({ type: "SET_LINKS", payload: [] }); // Clear the links if the user is not authenticated
    }
  }, [user]);

  const actions = {
    handleCreateNewLink: async (title, url) => {
      try {
        const linkId = await createLink(user.uid, title, url);
        dispatch({
          type: "ADD_LINK",
          payload: { linkId, title, url, visibility: true },
        });
        return linkId;
      } catch (error) {
        console.error("Error creating link:", error);
      }
    },
    handleUpdateExistingLink: async (linkId, newTitle, newUrl) => {
      try {
        await updateLink(linkId, newTitle, newUrl);
        dispatch({
          type: "UPDATE_LINK",
          payload: { linkId, title: newTitle, url: newUrl },
        });
      } catch (error) {
        console.error("Error updating link:", error);
      }
    },
    handleDeleteExistingLink: async (linkId) => {
      try {
        await deleteLink(linkId);
        dispatch({ type: "DELETE_LINK", payload: linkId });
        return true;
      } catch (error) {
        console.error("Error deleting link:", error);
      }
    },
    handleVisibilityChange: async (linkId, visibility) => {
      try {
        await changeLinkVisibility(linkId, visibility);
        dispatch({
          type: "TOGGLE_VISIBILITY",
          payload: { linkId, visibility },
        });
      } catch (error) {
        console.error("Error changing link visibility:", error);
      }
    },
  };

  return (
    <LinkContext.Provider value={{ state, actions }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
