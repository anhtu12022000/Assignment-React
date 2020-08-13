import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listProducts } from 'actions/productActions';
import { useDispatch } from 'react-redux';

const AboutScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
        return () => {
          
        }
      }, [])

    return (
        <div>
            <div className="about-header">
                <img width="100%" src="/images/amazon.jpg" />
                <Link className="about-text" href="https://blog.aboutamazon.co.uk/amazons-actions-to-help-employees-communities-and-customers-affected-by-covid-19" data-cms-ai="0">
                    Amazon’s actions to help employees, communities, and customers affected by COVID-19
                </Link>
            </div>
            <div className="about-body_header">
                <div className="about-body_lheader">
                    <h1>Amazon Fulfilment</h1>
                    <p>
                    We call our warehouses fulfilment centres because the entire process is fulfilled from start to finish 
                    – inventory comes in from manufacturers and is shipped out directly to customers.
                    </p>
                    <ol>
                        <li><Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/fulfilment-in-our-buildings">Our fulfilment centres</Link></li>
                        <li><Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/what-robots-do-and-dont-do-at-amazon-fulfilment-centres">Our innovation</Link></li>
                        <li><Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/compensation-and-benefits">Working here</Link></li>
                        <li><Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/economic-impact">Local investment</Link></li>
                        <li><Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/faqs">FAQs</Link></li>
                        <li><Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/tour-an-amazon-fulfilment-centre">Tour an Amazon Fulfilment Centre</Link></li>
                        <li><Link to="https://www.amazon.jobs/en/landing_pages/warehouse-operative">Amazon Fulfilment careers</Link></li>
                    </ol>
                </div>
                <div className="about-body_rheader">
                <ul className="about products">
                        <li>
                        <div className="product">
                            <Link to="https://blog.aboutamazon.co.uk/company-news/how-amazon-prioritises-health-and-safety-while-fulfilling-customer-orders">
                                <img width="100%" className="about-image_rheader" src="https://d39w7f4ix9f5s9.cloudfront.net/dims4/default/72921de/2147483647/strip/true/crop/2000x2000+541+0/resize/800x800!/quality/90/?url=http%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F7e%2Fcf%2F8fbc8a284d0c88e21a03176d7c3d%2Fjoy-obaraye-fc.jpg" />
                            </Link>
                            <div className="product-name">
                                <Link to="https://blog.aboutamazon.co.uk/company-news/how-amazon-prioritises-health-and-safety-while-fulfilling-customer-orders" >How Amazon prioritises health and safety while fulfilling customer orders</Link>
                            </div>
                            <div className="product-brand">We are committed to the health and safety of our associates, delivery service partners, drivers, employees, and customers.</div>
                            
                        </div>
                        </li> 
                        <li>
                        <div className="product">
                            <Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/how-your-package-gets-from-amazons-warehouse-to-your-front-door">
                                <img className="about-image_rheader" src="https://d39w7f4ix9f5s9.cloudfront.net/dims4/default/3c91420/2147483647/strip/true/crop/1333x1333+494+0/resize/800x800!/quality/90/?url=http%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2Fc5%2F7e%2F98e5bd5c4e839a1fda76b65c8992%2F20180829beverlybanquetscali-blog-03.JPG" />
                            </Link>
                            <div className="product-name">
                                <Link to="https://www.aboutamazon.co.uk/amazon-fulfilment/how-your-package-gets-from-amazons-warehouse-to-your-front-door" >How your package gets from Amazon's warehouse to your front door</Link>
                            </div>
                            <div className="product-brand">From cargo lorries to planes, a look at how Amazon is planning the future of delivery.</div>
                         
                        </div>
                        </li>   
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AboutScreen;