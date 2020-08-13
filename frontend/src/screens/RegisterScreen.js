import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { registerUser } from '../actions/userActions';
import { useForm } from "react-hook-form";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SvgIcon from '@material-ui/core/SvgIcon';

const RegisterScreen = (props) => {

    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;
    const { handleSubmit, register, errors } = useForm();
    const dispatch = useDispatch();

    const redirect = props.location.search? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        return () => {
            
        }
    }, [userInfo])

    const submitHandler = (values) => {
        dispatch(registerUser(values.name, values.email, values.password));
    }

    return (
        <div className="form">
            <form className="form-group" onSubmit={handleSubmit(submitHandler)}>
                <ul className="form-container registerUser">
                    <li><h1 className="center"><SvgIcon fontSize="inherit"><AccountCircleOutlinedIcon /></SvgIcon> Create Account</h1></li>
                    <li>{loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" ref={register({
                            required: "Name can't be empty"
                            })} />
                        <div className="error">* {errors.name && errors.name.message}</div>
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" ref={register({
                            required: "Email can't be empty",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                            })} />
                        <div className="error">* {errors.email && errors.email.message}</div>    
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" ref={register({
                            required: "Password can't be empty"
                            })} />
                        <div className="error">* {errors.password && errors.password.message}</div>
                    </li>
                    <li>
                        <label htmlFor="repassword">Re-Enter Password</label>
                        <input type="password" name="repassword" id="repassword" ref={register({
                            required: "Re-enter Password can't be empty"
                            })} />
                        <div className="error">* {errors.repassword && errors.repassword.message}</div>
                    </li>
                    <li>
                        <button type="submit" className="button center">Register</button>
                    </li>
                    <li>Already have an account Amazon? <Link to={redirect === "/" ? "signin" : "signin?redirect="+redirect} className="button center">Sign-in Now</Link></li>
                </ul>
            </form>
        </div>
    );
}

export default RegisterScreen;