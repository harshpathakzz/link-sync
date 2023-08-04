import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
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

  const cardStyles = {
    borderRadius: "8px",
    transition: "transform 0.3s",
    boxShadow: "0px 4px 8px rgba(63, 81, 342, 0.8)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  return (
    <Box m={2}>
      <Grid container spacing={3}>
        {timeFrames.map((timeFrame, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={cardStyles}>
              <CardContent>
                <Typography variant="h6">
                  {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}{" "}
                  Visits
                </Typography>
                <Typography>{visits[timeFrame]} visits</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserAnalyticsComponent;
