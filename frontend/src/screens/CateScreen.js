import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts,loadCateProducts } from 'actions/productActions';

const CateScreen = (props) => {

  const productList = useSelector(state => state.productList);
  const { filter } = productList;

  const productCate = useSelector(state => state.productCate);
  const { productscate } = productCate;

  const dispatch = useDispatch();
  const [cateParam,setCateParam] = useState(props.location.search? props.location.search.split("=")[1] : '/');
  
    useEffect(() => {
      dispatch(listProducts());
      if (cateParam) {
        dispatch(loadCateProducts(cateParam));
      }
      return () => {
        
      }
    }, [cateParam])
  
  return (
    <div>
      <div className="about-header">
                <img width="100%" src="/images/covid.jpg" />
                <Link className="about-text" href="https://d39w7f4ix9f5s9.cloudfront.net/dims4/default/89897c5/2147483647/strip/true/crop/1024x356+0+0/resize/1440x500!/quality/90/?url=http%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F79%2F5d%2F8227e6ee4d50b50dfc3b2140ef6c%2Fwhoa-1024x512-copy.jpg" data-cms-ai="0">
                    Amazon’s actions to help employees, communities, and customers affected by COVID-19
                </Link>
            </div>
        <h3 className="center">{cateParam}</h3>
      <ul className="products">
          {
            filter ? filter.map(product => (
              <li key={product._id}>
              <div className="product">
                <Link to={"/product/"+product._id}>
                    <img className="product-image" src={`/images/${product.image}`} />
                </Link>
                <div className="product-name">
                    <Link to={"/product/"+product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
              </div>
            </li>
            )) : productscate.map(product => (
              <li key={product._id}>
              <div className="product">
                <Link to={"/product/"+product._id}>
                    <img className="product-image" src={`/images/${product.image}`} />
                </Link>
                <div className="product-name">
                    <Link to={"/product/"+product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} Stars ({product.numReviews} Reviews)</div>
              </div>
            </li>
            ))
          }     
          </ul>
      </div>
  );
}

export default CateScreen;