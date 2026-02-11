import PaymentCard from "../PaymentCard/PaymentCard";
import { useAuth } from "../../contexts/AuthContext";

function UserPayments() {

  const {userPaymentMethods} = useAuth();

  return (
    <div className="mt-10! flex flex-col wrap-normal items-center gap-7">
        <PaymentCard paymentsList={userPaymentMethods}/>
    </div>
  )
}

export default UserPayments