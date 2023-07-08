import { useState } from "react";
import { Grid, Tab, Tabs } from "@mui/material";
import Header from "../Components/Header";
import AppearanceTab from "../Components/AppearanceTab";
import MobilePreview from "../Components/MobilePreview";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          {/* Left Part */}
          <div>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="Admin Tabs"
            >
              <Tab label="Links" />
              <Tab label="Appearance" />
            </Tabs>
            {activeTab === 0 && (
              <div>
                <h2>Tab 1 Content</h2>
                <ul>
                  <li>Link 1</li>
                  <li>Link 2</li>
                </ul>
              </div>
            )}
            {activeTab === 1 && <AppearanceTab />}
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          {/* Right Part */}
          <MobilePreview />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminPage;