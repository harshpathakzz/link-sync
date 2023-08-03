// AnalyticsTab.jsx
import { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { getUserVisitorCount } from "../functions/dbUserAnalyticsFunctions";
import { useUserAuth } from "../context/UserAuthContext";
import { getLinksByUserId } from "../functions/dbLinksFunctions";
import { getLinkVisitorCount } from "../functions/dbLinksAnalyticsFunctions";
import UserProfileAnalytics from "./UserProfileAnalytics"; // Create UserProfileAnalytics.jsx
import LinkAnalyticsTab from "./LinkAnalyticsTab"; // Create LinkAnalyticsTab.jsx

const AnalyticsTab = () => {
  const { user } = useUserAuth();
  const [userAnalytics, setUserAnalytics] = useState([]);
  const [linkAnalytics, setLinkAnalytics] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchAnalyticsData = async () => {
        // Fetch user analytics
        const userAnalyticsPromises = [
          "daily",
          "weekly",
          "monthly",
          "yearly",
        ].map((timePeriod) =>
          getUserVisitorCount(user.uid, timePeriod).then((count) => ({
            timePeriod,
            count,
          }))
        );

        const userAnalyticsResults = await Promise.all(userAnalyticsPromises);
        setUserAnalytics(userAnalyticsResults);

        // Fetch link analytics
        const links = await getLinksByUserId(user.uid);
        const linkAnalyticsPromises = links.map(async (link) => {
          const count = await getLinkVisitorCount(link.linkId, "daily"); // You can change the time period as needed
          return {
            timePeriod: link.title, // Use the link title as the time period for clarity
            count,
          };
        });

        const linkAnalyticsResults = await Promise.all(linkAnalyticsPromises);
        setLinkAnalytics(linkAnalyticsResults);
      };

      fetchAnalyticsData();
    }
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Website Analytics
      </Typography>
      {/* Render User Profile Analytics */}
      <UserProfileAnalytics userAnalytics={userAnalytics} />

      {/* Render Link Analytics Tabs */}
      <LinkAnalyticsTab linkAnalytics={linkAnalytics} />

      <Box mt={3} textAlign="center">
        <Typography variant="body1">
          Gain insights into your website's traffic over different time periods.
          Use these analytics to optimize your content and enhance user
          experience.
        </Typography>
      </Box>
    </Container>
  );
};

export default AnalyticsTab;
