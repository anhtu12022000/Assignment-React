import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { saveProduct, listProducts } from '../actions/productActions';
import { useForm } from "react-hook-form"; 
import CKEditor from "react-ckeditor-component";

const ProductsScreen = (props) => {

    const { handleSubmit, register, errors } = useForm();
    
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;
    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
    
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    //check login
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts());
        } else {
            props.history.push("/");
        }
        return () => {
            
        }
    }, [userInfo])

    const onChange = (evt) => {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        setDescription(newContent);
    }

    const onBlur = (evt) => {
        var newContent = evt.editor.getData();
        if (newContent === "") {
            alert("errr");
        }
    }

    const chooseFile = (evt) => {
        setFile(evt.target.files[0]);
    }

    const openModal = (product) => {
        setModalVisible(true);
    }

    const submitHandler = (values) => {
        dispatch(saveProduct(values,file,description));
    }

    return (<div>
    {modalVisible && <div className="form">
                <Fragment>
                <form onSubmit={handleSubmit(submitHandler)} autoComplete="off" enctype="multipart/form-data">
                    <ul className="form-container productAdd">
                        <li><h1 className="center">Create Product</h1></li>
                        <li>{loadingSave && <div>Loading...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" ref={register({
                                required: "Name can't be empty",
                                })} />
                            <div className="error">* {errors.name && errors.name.message}</div>
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" id="price" ref={register({
                                required: "Price can't be empty"
                                })} />
                            <div className="error">* {errors.price && errors.price.message}</div>
                        </li>
                        <li>
                            <label htmlFor="countinstock">Count Instock</label>
                            <input type="number" name="countinstock" id="countinstock" min="1" ref={register({
                                required: "Price can't be empty"
                                })} />
                            <div className="error">* {errors.countinstock && errors.countinstock.message}</div>
                        </li>
                        <li>
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" id="image" onChange={chooseFile} ref={register({
                                required: "Image can't be empty"
                                })} />
                            <div className="error">* {errors.image && errors.image.message}</div>
                        </li>
                        <li>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" ref={register({
                                required: "Brand can't be empty",
                                })} />
                            <div className="error">* {errors.brand && errors.brand.message}</div>
                        </li>
                        <li>
                            <label htmlFor="category">Category</label>
                            <input type="text" name="category" id="category" ref={register({
                                required: "Category can't be empty",
                                })} />
                            <div className="error">* {errors.category && errors.category.message}</div>
                        </li>
                        <li>
                            <label htmlFor="description">Description</label>
                            <CKEditor 
                                activeClass="p10" 
                                content={description} 
                                events={{
                                    "change": onChange,
                                    "blur": onBlur
                                }}
                            />
                            
                        </li>
                        <li>
                            <button type="submit" className="button center">Create</button>
                            <button type="button" onClick={() => setModalVisible(false)} className="button back">Back</button>
                        </li>   
                    </ul>
                
                </form>
                </Fragment>
            </div>
            }

            <div className="content content-margined">
                <div className="product-header">
                    <h1 className="center">Products</h1>
                    <button type="button" className="button create" onClick={() => openModal({})}>Create Product</button>
                </div>
                <div className="product-list">
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(item => (
                                <tr key={item._id}>
                                    <td width="5%" className="idproduct">{item._id}</td>
                                    <td>{item.name}</td>
                                    <td width="10%">{item.price}</td>
                                    <td width="10%"><img width="100%" src={`/images/${item.image}`} /></td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
                                    <td>
                                        <button type="button" className="action" onClick={() => openModal(item)}>Edit</button> | 
                                        <button type="button" className="action">Delete</button>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    
    );
}

export default ProductsScreen;