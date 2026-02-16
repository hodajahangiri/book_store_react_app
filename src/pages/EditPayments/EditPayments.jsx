import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { useProfile } from "../../contexts/UserProfileContext";
import { useLocation } from "react-router-dom";

function EditPayments() {

  const location = useLocation();
  const { payment, isAddForm } = location.state || {};

  const { updatePayment, addPayment } = useProfile()

  return (
    <>
      <PaymentForm submitFunction={isAddForm ? addPayment : updatePayment} payment={payment} isAddForm={isAddForm} />
    </>
  )
}

export default EditPayments