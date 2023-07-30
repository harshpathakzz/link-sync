import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIdByUsername } from "../functions/dbUsernameFunctions";
import UserProfileAvatar from "../Components/UserProfileAvatar";

const ProfilePage = () => {
  const { username } = useParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getIdByUsername(username);
      setUserId(id);
    };
    fetchUserId();
  }, [username]);

  return (
    <div>
      <h1>Profile Page</h1>
      {userId ? (
        <>
          <h2>Username: {username}</h2>
          <UserProfileAvatar userId={userId} />
          <h2>UserId: {userId}</h2>
        </>
      ) : (
        <h2>User not found.</h2>
      )}
    </div>
  );
};

export default ProfilePage;
