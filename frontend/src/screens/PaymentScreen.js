import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { savePayment } from 'actions/cartActions';
import CheckoutSteps from "components/Checkout/CheckoutSteps";

const PaymentScreen = (props) => {

    const userSignin = useSelector(state => state.userSignin);
    const {loading, error, userInfo} = userSignin;

    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();

    const submitHandler = (values) => {
        dispatch(savePayment(values.paymentMethod));
        props.history.push("placeorder");
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
            <form className="form-group" onSubmit={handleSubmit(submitHandler)}>
                <ul className="form-container registerUser">
                    <li><h1 className="center">Payment</h1></li>
                    <li>{loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                    <div><input type="radio" name="paymentMethod" defaultValue="Paypan" id="paymentMethod"  ref={register({
                            required: "Payment method can't be empty"
                            })} />
                            <img width="50%" src="https://ppl.i.lithium.com/t5/image/serverpage/image-id/56084iFE8EEC50D9040CCB/image-size/large?v=1.0&px=999" />
                    </div> 
                        <div className="error">* {errors.paymentMethod && errors.paymentMethod.message}</div>      
                    </li>

                    <li>
                        <button type="submit" className="button center">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
        </div>
    );
}

export default PaymentScreen;