import UserForm from "../../components/UserForm/UserForm";
import { useAuth } from "../../contexts/AuthContext";

function Register() {

  const {register} = useAuth();

  return (
    <UserForm submitFunction={register} isRegisterForm={true}/>
  )
}

export default Register