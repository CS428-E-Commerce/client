import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { LockIcon } from "assets/images";
import { memo } from "react";

import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { ToastService } from "services/toast_service";
import ApiService from "services/api_service";

const PaymentForm = memo(({ course, user, setModalType }) => {
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements || !course) {
      return ToastService.error(
        "Something went wrong. Please contact admins to get support.",
      );
    }

    dispatch(setLoading(true));

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      dispatch(setLoading(false));
      // TODO: Handle error later
      ToastService.error(error.message);
      return;
    }
    // TODO: setState to show another modal
    dispatch(setLoading(false));
    ToastService.success("Success");
    setModalType("payment-successfully");
    await ApiService.POST("/api/attendees", {
      courseId: course.id,
      userId: user.data.id,
    });
  };

  return (
    <form className={classes.payment} onSubmit={handleSubmit}>
      <PaymentElement />
      <button className={classes.btn}>Pay $6.00</button>
      <div className={classes.securePaymentContainer}>
        <LockIcon />
        <span>Secure payment</span>
      </div>
    </form>
  );
});

export default PaymentForm;
