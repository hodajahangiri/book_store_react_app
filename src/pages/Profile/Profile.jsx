import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import UserAddresses from "../../components/UserAddresses/UserAddresses";
import UserPayments from "../../components/UserPayments/UserPayments";

function Profile() {

  const { isAuthenticated, getUserProfile, user} = useAuth();

  const [IsProfile, setIsProfile] = useState(false);

  useEffect(() => {
      getUserProfile();
      setIsProfile(true);
  }, [IsProfile]);

  return (
    <>
      {isAuthenticated ?
        <>
          <UserInfoCard />
          <UserAddresses />
          <UserPayments />
        </>
        :
        <h1>There is no data to show you </h1>
      }

    </>
  )
}

export default Profile