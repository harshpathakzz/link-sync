import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const AppearanceTab = () => {
  const [avatarImage, setAvatarImage] = useState(null);

  const handleUploadClick = (event) => {
    // Logic to handle photo upload
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "satrt",
        margin: "20px",
      }}
    >
      <Avatar
        style={{ width: "100px", height: "100px", margin: "10px" }}
        src={avatarImage}
        alt="Avatar"
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          style={{ textTransform: "none", height: "30px", margin: "10px" }}
          variant="contained"
          color="primary"
          component="label"
          htmlFor="avatar-upload"
        >
          Upload Photo
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUploadClick}
          />
        </Button>
      </div>
    </div>
  );
};

export default AppearanceTab;
