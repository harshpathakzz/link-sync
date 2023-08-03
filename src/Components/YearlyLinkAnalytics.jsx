import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { getLinkVisitorCount } from "../functions/dbLinksAnalyticsFunctions";

const YearlyLinkAnalytics = ({ linkId }) => {
  const [yearlyClicks, setYearlyClicks] = useState(0);

  useEffect(() => {
    const fetchYearlyClicks = async () => {
      try {
        const count = await getLinkVisitorCount(linkId, "yearly");
        setYearlyClicks(count);
      } catch (error) {
        console.error("Error fetching yearly clicks:", error);
      }
    };

    fetchYearlyClicks();
  }, [linkId]);

  return <Typography>Yearly Clicks: {yearlyClicks}</Typography>;
};

export default YearlyLinkAnalytics;
