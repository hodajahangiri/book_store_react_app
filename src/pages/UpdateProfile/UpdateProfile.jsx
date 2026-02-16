import UserForm from "../../components/UserForm/UserForm";
import { useAuth } from "../../contexts/AuthContext";

function UpdateProfile() {

  const { updateProfile } = useAuth();

  return (
    <>
      <UserForm submitFunction={updateProfile} isRegisterForm={false} />
    </>
  )
}

export default UpdateProfile