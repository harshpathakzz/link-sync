export const linkReducer = (state, action) => {
  switch (action.type) {
    case "SET_LINKS":
      return {
        ...state,
        links: action.payload,
      };
    case "ADD_LINK":
      return {
        ...state,
        links: [...state.links, action.payload],
      };
    case "UPDATE_LINK":
      return {
        ...state,
        links: state.links.map((link) =>
          link.linkId === action.payload.linkId
            ? { ...link, title: action.payload.title, url: action.payload.url }
            : link
        ),
      };
    case "DELETE_LINK":
      return {
        ...state,
        links: state.links.filter((link) => link.linkId !== action.payload),
      };
    case "TOGGLE_VISIBILITY":
      return {
        ...state,
        links: state.links.map((link) =>
          link.linkId === action.payload.linkId
            ? { ...link, visibility: action.payload.visibility }
            : link
        ),
      };
    default:
      return state;
  }
};
