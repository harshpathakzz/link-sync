import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getLinkVisitorCount } from "../functions/dbLinksAnalyticsFunctions";

const MonthlyLinkAnalytics = ({ linkId }) => {
  const [monthlyClicks, setMonthlyClicks] = useState(0);

  useEffect(() => {
    const fetchMonthlyClicks = async () => {
      try {
        const count = await getLinkVisitorCount(linkId, "monthly");
        setMonthlyClicks(count);
      } catch (error) {
        console.error("Error fetching monthly clicks:", error);
      }
    };

    fetchMonthlyClicks();
  }, [linkId]);

  return <Typography>Monthly Clicks: {monthlyClicks}</Typography>;
};

export default MonthlyLinkAnalytics;
