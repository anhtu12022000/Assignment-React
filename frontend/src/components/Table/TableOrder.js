import React, { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrder } from 'actions/cartActions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
// @material-ui/core components

// import Table from "@material-ui/core/Table";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import MaterialTable from 'material-table';
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
import TableCell from '@material-ui/core/TableCell';
import Alert from '@material-ui/lab/Alert';

const useStyles2 = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
  },
}));

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

export default function CustomTable(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const orderList = useSelector(state => state.orderList);
  const {loading, success, orders, error} = orderList;

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(listOrder());
      return () => {
          
      }
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const mystyle = {
    textAlign: "center",
  };

  return (<div>
            <div className="content content-margined">
                <div className="product-header">
                    <h1 className="center">Orders</h1>
                </div>
                <div className="product-list">
                  {loading && <div>Loading...</div>}
                    {error && <div className={classes2.root}>
                            <Alert severity="danger">Error 500! Please reload page</Alert>
                        </div>
                    }
                    <table style={mystyle}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Payment Method</th>
                                <th>Total Price</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : orders
                            ).map((item,key) => (
                                <tr key={item._id}>
                                    <td width="15%">{key}</td>
                                    <td width="15%">{item.name}</td>
                                    <td width="15%">{item.address}</td>
                                    <td width="15%">{item.city}</td>
                                    <td width="15%">{item.country}</td>
                                    <td width="15%">{item.payment}</td>
                                    <td width="15%">${item.totalPrice}</td>
                                    <td width="15%">${item.date}</td>
                                    <td>
                                        <Link to={`/admin/orderdetail/${item._id}`} className="action">Details</Link>
                                    </td>
                                </tr>
                            ))}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                            </TableBody>
                        <TableFooter>
                        <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 15, { label: 'All', value: -1 }]}
                          colSpan={5}
                          count={orders.length}
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
