import AddressForm from "../../components/AddressForm/AddressForm";
import { useProfile } from "../../contexts/UserProfileContext";
import { useLocation } from "react-router-dom";

function EditAddresses() {
    const location = useLocation();
    const { address, isAddForm } = location.state || {};

    const { updateAddress, addAddress } = useProfile()

    return (
        <>
            <AddressForm submitFunction={isAddForm ? addAddress : updateAddress} address={address} isAddForm={isAddForm} />
        </>
    )
}

export default EditAddresses
