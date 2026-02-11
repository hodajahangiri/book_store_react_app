import PaymentCard from "../PaymentCard/PaymentCard";
import { useProfile } from "../../contexts/UserProfileContext";

function UserPayments() {


  const { userPaymentMethods } = useProfile();

  return (
    <div className="mt-10! flex flex-col wrap-normal items-center gap-7">
        <PaymentCard paymentsList={userPaymentMethods}/>
    </div>
  )
}

export default UserPayments