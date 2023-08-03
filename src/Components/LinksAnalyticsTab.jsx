import { useState, useEffect } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import { getLinksByUserId } from "../functions/dbLinksFunctions";
import { useUserAuth } from "../context/UserAuthContext";
import DailyLinkAnalytics from "./DailyLinkAnalytics";
import WeeklyLinkAnalytics from "./WeeklyLinkAnalytics";
import MonthlyLinkAnalytics from "./MonthlyLinkAnalytics";
import LifetimeLinkAnalytics from "./LifetimeLinkAnalytics";

const LinkAnalyticsComponent = () => {
  const [links, setLinks] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { user } = useUserAuth();

  useEffect(() => {
    // Fetch links using getLinksByUserId and update state
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getLinksByUserId(user.uid);
        setLinks(fetchedLinks);
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Daily" />
        <Tab label="Weekly" />
        <Tab label="Monthly" />
        <Tab label="Life Time" />
      </Tabs>

      {links.map((link) => (
        <div key={link.linkId}>
          <Typography variant="h6">{link.title}</Typography>

          {selectedTab === 0 && <DailyLinkAnalytics linkId={link.linkId} />}
          {selectedTab === 1 && <WeeklyLinkAnalytics linkId={link.linkId} />}
          {selectedTab === 2 && <MonthlyLinkAnalytics linkId={link.linkId} />}
          {selectedTab === 3 && <LifetimeLinkAnalytics linkId={link.linkId} />}
        </div>
      ))}
    </div>
  );
};

export default LinkAnalyticsComponent;
