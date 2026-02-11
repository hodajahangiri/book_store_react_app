import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useProfile } from "../../contexts/UserProfileContext";
import UserInfoCard from "../../components/UserInfoCard/UserInfoCard";
import UserAddresses from "../../components/UserAddresses/UserAddresses";
import UserPayments from "../../components/UserPayments/UserPayments";
import EditButton from "../../components/EditButton/EditButton";
import { useNavigate } from "react-router-dom";

function Profile() {

  const { isAuthenticated } = useAuth();
  const { getUserProfile } = useProfile();
  const [IsProfile, setIsProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile();
    setIsProfile(true);
  }, [IsProfile]);


  return (
    <>
      {isAuthenticated ?
        <>
          <UserInfoCard />
          <EditButton textButton="Update Profile" handleClick={() => {
            navigate('/profile/update')
          }} />
          <UserAddresses />
          <EditButton textButton="Add Address" handleClick={() => {
            navigate('/user/addresses', {
              state: {
                address: null,
                isAddForm: true
              }
            })
          }} />
          <UserPayments />
          <EditButton textButton="Add Payment Method" handleClick={() => {
            navigate('/user/payments', {
              state: {
                payment: null,
                isAddForm: true
              }
            })
          }} />
        </>
        :
        <h1>There is no data to show you </h1>
      }

    </>
  )
}

export default Profile