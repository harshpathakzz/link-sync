import { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { getUserVisitorCount } from "../functions/dbUserAnalyticsFunctions";
import { useUserAuth } from "../context/UserAuthContext";
import AnalyticsCard from "./AnalyticsCard";

const AnalyticsTab = () => {
  const { user } = useUserAuth();
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchAnalyticsData = async () => {
        const analyticsPromises = ["daily", "weekly", "monthly", "yearly"].map(
          (timePeriod) =>
            getUserVisitorCount(user.uid, timePeriod).then((count) => ({
              timePeriod,
              count,
            }))
        );

        const analyticsResults = await Promise.all(analyticsPromises);
        setAnalyticsData(analyticsResults);
      };

      fetchAnalyticsData();
    }
  }, [user]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2 }}>
        Website Analytics
      </Typography>
      <Grid container spacing={3}>
        {analyticsData.map((analyticsItem, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {/* Use the AnalyticsCard component */}
            <AnalyticsCard
              timePeriod={analyticsItem.timePeriod}
              count={analyticsItem.count}
            />
          </Grid>
        ))}
      </Grid>
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
