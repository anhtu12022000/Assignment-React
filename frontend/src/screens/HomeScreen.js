import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { listProducts,orderProducts,filterProducts } from 'actions/productActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from "prop-types";
// core components
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


//Cart
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Select
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

//Search
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    }, 
    image: {
      height: '275px',
      overflow: 'hidden',
    },  
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));




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

const HomeScreen = (props) => {
    const classes = useStyles();
    const productList = useSelector(state => state.productList);
    const { products, loading, error} = productList;
    const dispatch = useDispatch();
  
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('');
    const [toggle, setToggle] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(8);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(() => {
      dispatch(listProducts());
      return () => {
        
      }
    }, [])

    // const [expanded, setExpanded] = useState(false);
  
    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };

    const handleChange = (event) => {
      setOrder(event.target.value);
      setToggle(true);
      setTimeout(() => {
        setToggle(false);
      }, 1500);
      dispatch(orderProducts(event.target.value));
    };

    const handleFilter = (event) => {
      setKeyword(event.target.value);
      setToggle(true);
      setTimeout(() => {
        setToggle(false);
      }, 1500);
      dispatch(filterProducts(event.target.value.toLowerCase()));
    };
  
    return (
      error? (<div>500 ERROR</div>) :
      <div>
      {loading || toggle && <div className="leni">
        <LinearProgress color="secondary" />
      </div>}
      <div className="about-header">
                <img width="100%" src="/images/covid.jpg" />
                <Link className="about-text" href="https://d39w7f4ix9f5s9.cloudfront.net/dims4/default/89897c5/2147483647/strip/true/crop/1024x356+0+0/resize/1440x500!/quality/90/?url=http%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F79%2F5d%2F8227e6ee4d50b50dfc3b2140ef6c%2Fwhoa-1024x512-copy.jpg" data-cms-ai="0">
                    Amazon’s actions to help employees, communities, and customers affected by COVID-19
                </Link>
            </div>
      <div className="orderby">
        <h3>Amazon auto</h3>
        {/* Input Order by */}
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Order By</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={order}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Price</em>
          </MenuItem>
          <MenuItem value={"latest"}>Latest</MenuItem>
          <MenuItem value={"lowest"}>Lowest</MenuItem>
        </Select>
        <FormHelperText>Order by {order}</FormHelperText>
      </FormControl>
      
      {/* Input Search */}
      <div style={{float: 'right'}}>
      <FormControl className={classes.formControl}>
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
      <hr />
      </div>      
      {/* Print products */}
      {products.length == 0 && <h3 className="center">Can't find data products "{keyword}"!</h3>}
      <ul className="products">
          {
            (rowsPerPage > 0
              ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : products
            ).map((product,key) => (
        <li key={key}>
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader={`$${product.price}`}
      />
      <div className={classes.image}><Link to={"/product/"+product._id}><img width="100%" src={`/images/${product.image}`} /></Link></div>
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="p">
          {product.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
        </li>
            ))
          }        
          </ul>
          
          <div className="paginate">
          <TablePagination
            rowsPerPageOptions={[8, 16, 24, { label: 'All', value: -1 }]}
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
          </div>
                    
      </div>
    );
}

export default HomeScreen;