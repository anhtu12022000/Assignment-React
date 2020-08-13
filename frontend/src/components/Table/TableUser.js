import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { listUsers,changeAdmin } from 'actions/userActions';
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
import StarsIcon from '@material-ui/icons/Stars';
import ToggleButton from '@material-ui/lab/ToggleButton';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(styles);
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

const useStyles2 = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 300,
      },
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

  const mystyle = {
    textAlign: "center",
  };

export default function CustomTable(props) {
  const classes = useStyles();
  const classes2 = useStyles2();

  const userList = useSelector(state => state.userList);
  const {loading, users, error} = userList;

  const userUpdate = useSelector(state => state.userUpdate);
  const {update, error: errorUpdate} = userUpdate;

  const dispatch = useDispatch();

  // Notification
  const [tc, setTC] = useState(false);

  useEffect(() => {
      dispatch(listUsers());
      return () => {
          
      }
  }, [update])

  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: '_id' },
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Role', field: 'role' },

    ],
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdmin = (id) => {
      dispatch(changeAdmin(id));
  }

  return (<div>
            <div className="content content-margined">
                <div className="product-header">
                    <h1 className="center">Users</h1>
                </div>
                <div className="product-list">
                {loading && <div>Loading...</div>}
                    {error || errorUpdate && <div className={classes2.root}>
                            <Alert severity="danger">Error 500! Please reload page</Alert>
                        </div>
                    }
                    <table style={mystyle}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                            ).map((item,key) => (
                                <tr key={item._id}>
                                    <td width="20%">{key}</td>
                                    <td width="20%">{item.name}</td>
                                    <td width="20%">{item.email}</td>
                                    <td width="20%"><ToggleButton
                                      value="check"
                                      onChange={() => handleAdmin(item._id)}
                                    >
                                      <SvgIcon style={{ color: item.isAdmin ? '#ff0000' : '' }}><StarsIcon /></SvgIcon>
                                    </ToggleButton>
                                    </td>
                                    <td width="20%">{item.date}</td>
                                    <td width="20%">
                                        <button type="button" className="action">Delete</button>
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
                          colSpan={4}
                          count={users.length}
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
