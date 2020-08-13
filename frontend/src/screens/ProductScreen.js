import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { detailProduct } from '../actions/productActions';
import ReactHtmlParser from 'react-html-parser';
import { AnimateOnChange } from 'react-animation';


const ProductScreen = (props) => {

    const [qty, setQty] = useState(1);
    const productDetail = useSelector(state => state.productDetail);
    const { product, loading, error } = productDetail;
    const [imageURL, setImageURL] = useState(null);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();

    const id = props.match.params.id;
   
    useEffect(() => {
        dispatch(detailProduct(id));
        window.scrollTo(0,0);
        
        return () => {
            
        }
    }, []);
   
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty="+qty);
    }

    const handleChangeImage = (url) => {
        setTimeout(() => {
            setImageURL(url);
            setToggle(true);
        }, 600);
        setTimeout(() => {
            load()
        }, 1200);
    }

    const load = () => {
        setToggle(false);
    }

    return loading? (<div className="loader"></div>) :
    error? (<div><p className="error500">500 ERROR</p></div>) :
    (
        <div>         
             <div className="details">
                 <div className="details-image">
                    {imageURL === null ? <img src={`/images/${product.image}`} className="img" alt={product.name} align="left" /> :
                        <img className={toggle ? "img" : ""} src={`/images/product/${imageURL}`} alt={product.name} align="left" />
                    }
                    <ul>
                        {product.images && product.images.map((image,key) =>
                            <li key={key}>
                                <img onMouseMove={() => handleChangeImage(image)} style={{margin: '10px'}} width="50px" height="50px" src={`/images/product/${image}`} alt={product.name} />
                            </li>
                        )}
                    </ul>
                 </div>
                 
                 <div className="details-add">
                 <div className="details-info">
                    <ul>
                        <li>
                            <h4>{product.name}</h4>
                        </li>
                        <li>
                            <h4>Category: {product.category}</h4>
                        </li>
                        <li>
                            {product.rating} Stars ({product.numReviews} Reviews)
                        </li>
                        <li>
                            Price: $<b>{product.price}</b>
                        </li>
                        <li>
                            <h1>Description</h1>
                            {ReactHtmlParser(product.description)}
                        </li>
                    </ul>
                 </div>
                 <div className="details-action">
                    <ul>
                        <li>
                            Price: ${product.price}
                        </li>
                        <li>
                            Status: {product.countInStock > 0? "In Stock" : "Out of Stock"}
                        </li>
                        <li>
                            Quantity: 
                                <select value={qty} onChange={(e) => { setQty(e.target.value)} }>
                                    {[...Array(product.countInStock).keys()].map(x =>
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    )}
                                </select>
                        </li>
                        <li>
                            {product.countInStock > 0 && <button onClick={handleAddToCart} className="button">Add to cart</button>}
                        </li>
                    </ul>
                 </div>
                 </div>
             </div>
        </div>
    );
}

export default ProductScreen;