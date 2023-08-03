// WeeklyLinkAnalytics.js
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getLinkVisitorCount } from "../functions/dbLinksAnalyticsFunctions";

const WeeklyLinkAnalytics = ({ linkId }) => {
  const [weeklyClicks, setWeeklyClicks] = useState(0);

  useEffect(() => {
    const fetchWeeklyClicks = async () => {
      try {
        const count = await getLinkVisitorCount(linkId, "weekly");
        setWeeklyClicks(count);
      } catch (error) {
        console.error("Error fetching weekly clicks:", error);
      }
    };

    fetchWeeklyClicks();
  }, [linkId]);

  return <Typography>Weekly Clicks: {weeklyClicks}</Typography>;
};

export default WeeklyLinkAnalytics;
