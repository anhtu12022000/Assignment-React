import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { listCategory,saveCate,delCate } from 'actions/cateActions';
import { useForm } from "react-hook-form"; 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
// @material-ui/core components

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
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

  const cateList = useSelector(state => state.cateList);
  const {loading, category, error} = cateList;
  const categorySave = useSelector(state => state.categorySave);
  let {loading: loadingSave, success: successSave, error: errorSave} = categorySave;
  const cateDel = useSelector(state => state.cateDel);
  let {loading: loadingDel, success: successDel, error: errorDel} = cateDel;

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  // Notification
  const [tc, setTC] = useState(false);
  const [del, setDel] = useState(false);

  //Edit
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

  useEffect(() => {
      dispatch(listCategory());
      return () => {
          
      }
  }, [successSave,successDel])

  const [state, setState] = React.useState({
    columns: [
      { title: 'Id', field: '_id' },
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description'},
    ],
  });

  const openModal = (cate) => {
      setModalVisible(true);
      console.log(cate.image);
        setId(cate._id);
        setName(cate.name);
        setDescription(cate.description);
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, category.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const submitHandler = (values) => {
    dispatch(saveCate(values.name,values.description,id));
    window.scrollTo(0,0);
    setModalVisible(false);
      setTC(true);
  };

  const deleteCate = (id) => {
    if (window.confirm("Are you sure delete category?")) {
      dispatch(delCate(id));
      setDel(true);
    }
  }

  const mystyle = {
    textAlign: "center",
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
                              open={del}
                              closeNotification={() => setDel(false)}
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
        {modalVisible && <div className="form">
                <form className="form-cu" onSubmit={handleSubmit(submitHandler)} autoComplete="off" encType="multipart/form-data">
                    <ul className="form-container productAdd">
                        <li><h1 className="center">Create Product</h1></li>
                        <li>{loading && <div>Loading...</div>}
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
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" id="description" defaultValue={description} ref={register({
                                required: "Description can't be empty"
                                })} />
                            <div className="error">* {errors.description && errors.description.message}</div>
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
                    <h1 className="center">Category</h1>
                    <button type="button" className="button create" onClick={() => openModal({})}>Create category</button>
                </div>
                <div className="product-list">
                    <table style={mystyle}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? category.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : category
                            ).map((item,key) => (
                        
                                <tr key={item._id}>
                                    <td width="20%" className="idproduct">{key}</td>
                                    <td width="20%">{item.name}</td>
                                    <td width="20%">{item.description}</td>
                                    <td width="20%">{item.date}</td>
                                    <td width="20%">
                                        <button type="button" className="action" onClick={() => openModal(item)}>Edit</button> | 
                                        <button type="button" className="action" onClick={() => deleteCate(item._id)}>Delete</button>
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
                          colSpan={5}
                          count={category.length}
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
