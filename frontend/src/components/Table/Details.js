import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { listOrderDetail } from 'actions/cartActions';
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
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import TableBody from '@material-ui/core/TableBody';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableRow from '@material-ui/core/TableRow';
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
  

export default function Details(props) {
  const classes = useStyles();
  const { id } = props;

  const orderDetail = useSelector(state => state.orderDetail);
  const {loading, order, error} = orderDetail;

  const dispatch = useDispatch();
  // Notification
  const [tc, setTC] = useState(false);

  useEffect(() => {
      dispatch(listOrderDetail(id));
      return () => {
          
      }
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, order.length - page * rowsPerPage);

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
                    <h1 className="center">Order detail</h1>
                </div>
                <div className="product-list" style={classes}>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                    <table style={mystyle}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : order
                            ).map((item,key) => (
                                <tr key={key}>
                                    <td width="15%">{key}</td>
                                    <td width="15%">{item.name}</td>
                                    <td width="20%"><img width="30%" src={`/images/${item.image}`} /></td>
                                    <td width="15%">${item.price}</td>
                                    <td width="15%">{item.qty}</td>
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
                          colSpan={4}
                          count={order.length}
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

Details.defaultProps = {
  tableHeaderColor: "gray"
};

Details.propTypes = {
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
