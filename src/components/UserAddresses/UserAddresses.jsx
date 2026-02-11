import AddressCard from "../AddressCard/AddressCard";
import { useAuth } from "../../contexts/AuthContext";

function UserAddresses() {

  const { userAddresses } = useAuth(); 

  return (
    <div className="mt-10! flex flex-col wrap-normal items-center gap-7">
      <AddressCard addressList={userAddresses}/>
    </div>
  )
}

export default UserAddresses