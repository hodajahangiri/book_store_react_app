import AddressCard from "../AddressCard/AddressCard";
import { useProfile } from "../../contexts/UserProfileContext";

function UserAddresses() {

  const { userAddresses } = useProfile();

  return (
    <div className="mt-10! flex flex-col wrap-normal items-center gap-7">
      <AddressCard addressList={userAddresses} />
    </div>
  )
}

export default UserAddresses