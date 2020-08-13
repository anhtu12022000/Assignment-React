import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import { useForm } from "react-hook-form";
import CheckoutSteps from "components/Checkout/CheckoutSteps";

const ShippingScreen = (props) => {

    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();

    const redirect = props.location.search? props.location.search.split("=")[1] : '/';

    const submitHandler = (values) => {
        dispatch(saveShipping(values));
        props.history.push("payment");
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <div className="form">
            <form className="form-group" onSubmit={handleSubmit(submitHandler)}>
                <ul className="form-container registerUser">
                    <li><h1 className="center">Shipping</h1></li>
                    <li>{loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" ref={register({
                            required: "Address can't be empty"
                            })} />
                        <div className="error">* {errors.address && errors.address.message}</div>
                    </li>

                    <li>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" ref={register({
                            required: "City can't be empty"
                            })} />
                        <div className="error">* {errors.city && errors.city.message}</div>
                    </li>

                    <li>
                        <label htmlFor="postal">Postal - code</label>
                        <input type="text" name="postal" id="postal" ref={register({
                            required: "Postal - code can't be empty"
                            })} />
                        <div className="error">* {errors.postal && errors.postal.message}</div>
                    </li>

                    <li>
                        <label htmlFor="country">Country</label>
                        <input type="text" name="country" id="country" ref={register({
                            required: "Country can't be empty"
                            })} />
                        <div className="error">* {errors.country && errors.country.message}</div>
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

export default ShippingScreen;