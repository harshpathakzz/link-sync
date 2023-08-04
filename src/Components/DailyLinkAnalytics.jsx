// DailyLinkAnalytics.js
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getLinkVisitorCount } from "../functions/dbLinksAnalyticsFunctions";

const DailyLinkAnalytics = ({ linkId }) => {
  const [dailyClicks, setDailyClicks] = useState(0);

  useEffect(() => {
    const fetchDailyClicks = async () => {
      try {
        const count = await getLinkVisitorCount(linkId, "daily");
        setDailyClicks(count);
      } catch (error) {
        console.error("Error fetching daily clicks:", error);
      }
    };

    fetchDailyClicks();
  }, [linkId]);

  return <Typography>Clicks: {dailyClicks}</Typography>;
};

export default DailyLinkAnalytics;
