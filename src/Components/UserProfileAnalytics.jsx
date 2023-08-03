import { Typography, Card, CardContent, Grid } from "@mui/material";

const UserProfileAnalytics = ({ userAnalytics }) => {
  return (
    <Grid container spacing={3}>
      {userAnalytics.map((analyticsItem, index) => (
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
  );
};

export default UserProfileAnalytics;
