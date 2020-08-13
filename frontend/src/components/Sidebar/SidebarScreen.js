import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { listCateProducts } from 'actions/productActions';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import SvgIcon from '@material-ui/core/SvgIcon';

const SidebarScreen = (props) => {

    const productList = useSelector(state => state.productList);
    const { sibar } = productList;
    const dispatch = useDispatch();


    const logOut = () => {
        Cookies.remove('userInfo');
        window.location.reload(false);
    }

    return (
        <ul>
            {sibar.map((category,key) => 
                <li className="category" key={key}>
                    <Link to={`/cate?category=${category}`} onClick={() => dispatch(listCateProducts(category))}>{category} <SvgIcon color="error" fontSize="inherit"><VisibilityOutlinedIcon /></SvgIcon></Link>
                </li>
            )}
            <li>{ props.userInfo ? <div><button className="button logout" onClick={logOut}>Logout</button></div> : ''}</li>
      </ul>
    );
}

export default SidebarScreen;