import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { getUserVisitorCount } from "../functions/dbUserAnalyticsFunctions";
import { useUserAuth } from "../context/UserAuthContext";

const UserAnalyticsComponent = () => {
  const { user } = useUserAuth();
  const timeFrames = useMemo(
    () => ["daily", "weekly", "monthly", "yearly"],
    []
  );

  const [visits, setVisits] = useState({});

  useEffect(() => {
    const fetchUserAnalytics = async () => {
      const analytics = {};

      for (const timeFrame of timeFrames) {
        try {
          const count = await getUserVisitorCount(user.uid, timeFrame);
          analytics[timeFrame] = count;
        } catch (error) {
          console.error(`Error fetching ${timeFrame} visits:`, error);
        }
      }

      setVisits(analytics);
    };

    fetchUserAnalytics();
  }, [user.uid, timeFrames]);

  return (
    <Grid container spacing={3}>
      {timeFrames.map((timeFrame, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)} Visits
              </Typography>
              <Typography>{visits[timeFrame]} visits</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserAnalyticsComponent;
