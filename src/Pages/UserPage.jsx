import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{username}</h2>
    </div>
  );
};

export default ProfilePage;
