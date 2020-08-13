import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { signin } from '../actions/userActions';
import { useForm } from "react-hook-form";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SvgIcon from '@material-ui/core/SvgIcon';
import SliderContent from './adminscreens/SliderComponent';
import Slide from './adminscreens/ImageComponent';
import { css, jsx } from '@emotion/core';

const SigninScreen = (props) => {
    //Validate form
    const { handleSubmit, register, errors } = useForm();
    
    const userSignin = useSelector(state => state.userSignin);
    const {loading, error, userInfo} = userSignin;

    const dispatch = useDispatch();

    const redirect = props.location.search? props.location.search.split("=")[1] : '/';
    useEffect(() => {
        if (userInfo) {
            if (userInfo.isAdmin) {
                props.history.push("/admin");
            } else {
                props.history.push(redirect);
            }
        }
        return () => {
            
        }
    }, [userInfo])

    const submitHandler = (values) => {
        dispatch(signin(values.email, values.password));     
    }

    return (
        <div className="form">     
            <form className="form-group" onSubmit={handleSubmit(submitHandler)}>
                <ul className="form-container signin">
                    <li><h1 className="center"><SvgIcon fontSize="inherit"><AccountCircleOutlinedIcon /></SvgIcon>Signin</h1></li>
                    <li>{loading && <div className="loading">
                        <div className="loader">
                            <div className="l _1"></div>
                            <div className="l _2"></div>
                            <div className="l _3"></div>
                            <div className="l _4"></div>
                        </div>
                    </div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" defaultValue="vungoctu.dev@gmail.com" ref={register({
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
                        <input type="password" name="password" id="password" defaultValue="123456" ref={register({
                            required: "Password can't be empty"
                            })} />
                        <div className="error">* {errors.password && errors.password.message}</div>
                    </li>
                    <li>
                        <button type="submit" className="button center">Signin</button>
                    </li>
                    <li>New to Amazon?</li>
                    <li><Link to={redirect === "/" ? "register" : "register?redirect="+redirect} className="button center">Create your Amazon account</Link></li>
                </ul>
              
            </form>
        </div>
    );
}


export default SigninScreen;