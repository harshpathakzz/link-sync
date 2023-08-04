import { useState, useEffect } from "react";
import { Tabs, Tab, Typography, Paper, Box } from "@mui/material";
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
    <Box sx={{ padding: 2 }}>
      <Paper elevation={0} sx={{ marginBottom: 2, padding: 1 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Tab label="Daily" sx={{ minWidth: "unset" }} />
          <Tab label="Weekly" sx={{ minWidth: "unset" }} />
          <Tab label="Monthly" sx={{ minWidth: "unset" }} />
          <Tab label="Lifetime" sx={{ minWidth: "unset" }} />
        </Tabs>
      </Paper>

      {links.map((link) => (
        <Paper
          key={link.linkId}
          elevation={3}
          sx={{
            marginBottom: 2,
            padding: 2,
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "scale(1.02)" },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
            {link.title}
          </Typography>

          {selectedTab === 0 && <DailyLinkAnalytics linkId={link.linkId} />}
          {selectedTab === 1 && <WeeklyLinkAnalytics linkId={link.linkId} />}
          {selectedTab === 2 && <MonthlyLinkAnalytics linkId={link.linkId} />}
          {selectedTab === 3 && <LifetimeLinkAnalytics linkId={link.linkId} />}
        </Paper>
      ))}
    </Box>
  );
};

export default LinkAnalyticsComponent;
