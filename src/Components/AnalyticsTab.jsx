import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { getUserVisitorCount } from "../functions/dbUserAnalyticsFunctions";
import { useUserAuth } from "../context/UserAuthContext";

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
            <Card variant="outlined" sx={{ height: "100%", borderRadius: 5 }}>
              <CardContent>
                <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                  {analyticsItem.timePeriod.charAt(0).toUpperCase() +
                    analyticsItem.timePeriod.slice(1)}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Total Visitors: {analyticsItem.count}
                </Typography>
              </CardContent>
            </Card>
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
