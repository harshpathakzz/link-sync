import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getAllLinkVisits } from "../functions/dbLinksAnalyticsFunctions";

const LifetimeLinkAnalytics = ({ linkId }) => {
  const [lifetimeClicks, setLifetimeClicks] = useState(0);

  useEffect(() => {
    const fetchLifetimeClicks = async () => {
      try {
        const count = await getAllLinkVisits(linkId);
        setLifetimeClicks(count);
      } catch (error) {
        console.error("Error fetching lifetime clicks:", error);
      }
    };

    fetchLifetimeClicks();
  }, [linkId]);

  return <Typography>Lifetime Clicks: {lifetimeClicks}</Typography>;
};

export default LifetimeLinkAnalytics;
