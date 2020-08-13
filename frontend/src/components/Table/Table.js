import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { saveProduct, listProducts, delProduct, filterProducts } from 'actions/productActions';
import { listCategory } from 'actions/cateActions';

import { useForm } from "react-hook-form"; 
import CKEditor from "react-ckeditor-component";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import TableBody from '@material-ui/core/TableBody';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from "components/Snackbar/Snackbar";
import AddAlert from "@material-ui/icons/AddAlert";
import TableCell from '@material-ui/core/TableCell';

// Search
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


const useStyles = makeStyles(styles);
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  
  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });   

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableHeaderColor } = props;
  const { handleSubmit, register, errors } = useForm({
    mode: 'all'
  }); 

  const productList = useSelector(state => state.productList);
  const {loading, products, error} = productList;

  const cateList = useSelector(state => state.cateList);
  const {loading: loadingCate, category: listcate, error: errorCate} = cateList;

  const productSave = useSelector(state => state.productSave);
  const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
  const productDel = useSelector(state => state.productDetail);
  const {loading: loadingDel, success: successDel, error: errorDel} = productDel;

  
  const [file, setFile] = useState('');
  const [files, setFiles] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  // Notification
  const [tc, setTC] = useState(false);

  //Edit
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [images, setImages] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countinstock, setCountInStock] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

  useEffect(() => {
      dispatch(listProducts());
      dispatch(listCategory());
      return () => {
          
      }
  }, [successSave,successDel])

  // const [state, setState] = React.useState({
  //   columns: [
  //     { title: 'Id', field: '_id' },
  //     { title: 'Name', field: 'name' },
  //     { title: 'Price', field: 'price', type: 'numeric' },
  //     { title: 'Image', field: 'image' },
  //     { title: 'Category', field: 'category' },
  //     { title: 'Brand', field: 'brand', },
  //   ],
  // });

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

  const chooseFiles = (evt) => {
    setFiles({ imgCollection: evt.target.files });
  }

  const openModal = (product) => {
      setModalVisible(true);
      console.log(product.image);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImages(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setTitle(product.title);
        setDescription(product.description);
  }

  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const submitHandler = (values) => {
    dispatch(saveProduct(values,file,files,description,id));
    window.scrollTo(0,0);
    setModalVisible(false);
    setTC(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure delete product?")) {
      dispatch(delProduct(id));
      setTC(true);
    }
    return;
  }

  const mystyle = {
    textAlign: "center",
  };

  const handleFilter = (event) => {
    setKeyword(event.target.value);
    dispatch(filterProducts(event.target.value.toLowerCase()));
  };

  return (<div>
                  {errorSave && <Snackbar
                              place="tc"
                              color="danger"
                              icon={AddAlert}
                              message={errorSave}
                              open={tc}
                              closeNotification={() => setTC(false)}
                              close
                            />}
                            {errorDel && <Snackbar
                              place="tc"
                              color="danger"
                              icon={AddAlert}
                              message={errorDel}
                              open={tc}
                              closeNotification={() => setTC(false)}
                              close
                            />}
                            {successSave && <Snackbar
                              place="tc"
                              color="info"
                              icon={AddAlert}
                              message="Action Successfully."
                              open={tc}
                              closeNotification={() => setTC(false)}
                              close
                            />}
                            {successDel && <Snackbar
                              place="tc"
                              color="info"
                              icon={AddAlert}
                              message="Delete Successfully."
                              open={tc}
                              closeNotification={() => setTC(false)}
                              close
                            />}
        {modalVisible && <div className="form">
                <form className="form-cu" onSubmit={(e) => e.preventDefault(),handleSubmit(submitHandler)} autoComplete="off" encType="multipart/form-data">
                    <ul className="form-container productAdd">
                        <li><h1 className="center">Create Product</h1></li>
                        <li>{loadingSave && <div>Loading...</div>}
                        </li>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" defaultValue={name} ref={register({
                                required: "Name can't be empty",
                                pattern: {
                                  value: /^[^\s]+(\s+[^\s]+)*$/,
                                  message: "Invalid space name"
                                }
                                })} />
                            <div className="error">* {errors.name && errors.name.message}</div>
                        </li>
                        <li>
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" id="price" min="0" defaultValue={price} ref={register({
                                required: "Price can't be empty"
                                })} />
                            <div className="error">* {errors.price && errors.price.message}</div>
                        </li>
                        <li>
                            <label htmlFor="countinstock">Count Instock</label>
                            <input type="number" name="countinstock" id="countinstock" defaultValue={countinstock} min="1" ref={register({
                                required: "Count-Instock can't be empty"
                                })} />
                            <div className="error">* {errors.countinstock && errors.countinstock.message}</div>
                        </li>
                        {
                            !id && <li>
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" id="image" accept="image/png, image/jpeg" onChange={chooseFile} ref={register({
                                    required: "Image can't be empty"
                                    })} />
                                {image && <img src={`/images/${image}`} alt=" " />}    
                                <div className="error">* {errors.image && errors.image.message}</div>
                            </li>
                        }
                        {
                            id && <li>
                                <label htmlFor="image">Image</label>
                                <input type="file" name="image" id="image" onChange={chooseFile} />
                                <img src={`/images/${image}`} alt=" " />    
                            </li>
                        }
                        <li>
                            <label htmlFor="image">Image Detail</label>
                            <input type="file" name="images" id="images" accept="image/png, image/jpeg" ref={register({
                                    required: "Images can't be empty"
                                    })}
                                    multiple onChange={chooseFiles} />  
                             <ol>
                             {images && images.map((x,key) =>
                                <li key={key} style={{float: 'left', padding: '10px'}}>
                                    <img width="50px" height="50px" src={`/images/product/${x}`} alt={name} />
                                </li>
                            )}
                             </ol>       
                        </li>
                        <li>
                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" defaultValue={brand} ref={register({
                                required: "Brand can't be empty",
                                })} />
                            <div className="error">* {errors.brand && errors.brand.message}</div>
                        </li>
                        <li>
                          <label htmlFor="category">Category</label>
                          <select id="category" name="category" ref={register({
                                required: "Category can't be empty",
                                })}>
                              <option defaultValue="Random">Choose Category</option>
                              {listcate.map((item,key) => (
                                <option selected={item.name === category ? "selected" : ""} key={key} value={item.name}>{item.name}</option>
                              ))}
                          </select>
                        </li>
                        <li>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" defaultValue={title} ref={register({
                                required: "Title can't be empty",
                                })} />
                            <div className="error">* {errors.title && errors.title.message}</div>
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
                                name="textbox"
                                ref={register({
                                required: "Title can't be empty",
                                })}
                            />
                            <div className="error">* {errors.textbox && errors.textbox.message}</div>
                        </li>
                        <li>
                            <button type="submit" className="button center">{id ? "Update" : "Create"}</button>
                            <button type="button" onClick={() => setModalVisible(false)} className="button back">Back</button>
                        </li>   
                    </ul>
                
                </form>
            </div>
            }

            <div className="content content-margined">
                <div className="product-header">
                    <h1 className="center">Products</h1>
                    <button type="button" className="button create" onClick={() => openModal({})}>Create Product</button>
                </div>
                <div style={{float: 'right', width: '350px'}}>
                          <FormControl style={{width: '100%'}}>
                              <InputLabel htmlFor="standard-adornment-password">Search</InputLabel>
                              <Input
                                id="standard-adornment-password"
                                value={keyword}
                                onChange={handleFilter}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              <FormHelperText>Filter by keywords {keyword}</FormHelperText>
                            </FormControl>
                          </div>
                <div className="product-list">
                    <table style={mystyle}>
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
                        <TableBody>
                            {(rowsPerPage > 0
                                ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : products
                            ).map((item,key) => (
                        
                                <tr key={item._id}>
                                    <td width="5%" className="idproduct">{key}</td>
                                    <td width="20%">{item.name}</td>
                                    <td width="10%">{item.price}</td>
                                    <td width="10%"><img width="100%" src={`/images/${item.image}`} /></td>
                                    <td>{item.countInStock}</td>
                                    <td>{item.brand}</td>
                                    <td>
                                        <button type="button" className="action" onClick={() => openModal(item)}>Edit</button> | 
                                        <button type="button" className="action" onClick={() => deleteProduct(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 50 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                            </TableBody>
                        <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                          colSpan={7}
                          count={products.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                    </table>
                </div>
            </div>
        </div>    
    );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
