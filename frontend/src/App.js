import React from 'react';
import { BrowserRouter,Route,Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/adminscreens/ProductsScreen';
import UserProfile from './screens/UserProfile';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import CateScreen from './screens/CateScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import SidebarScreen from 'components/Sidebar/SidebarScreen';
import { useSelector } from 'react-redux';

import "./assets/css/material-dashboard-react.css?v=1.9.0";
import { createBrowserHistory } from "history";
import { Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

//Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "assets/css/material-dashboard-react.css?v=1.9.0";
import InfoIcon from '@material-ui/icons/Info';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const hist = createBrowserHistory();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      All right reserved. Anh Tu - AMAZON 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];
function App() {

  const classes = useStyles();
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  console.log(userInfo);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter history={hist}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
        </Switch>

      <div className="grid-container">z
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>☰</button>
          <Link to="/">Amazon</Link>
        </div>
        <div className="header-links">
          <Link to="/about"><SvgIcon fontSize="inherit"><InfoIcon /></SvgIcon> About-us</Link>
          <Link to="/contact"><SvgIcon fontSize="inherit"><ContactMailOutlinedIcon /></SvgIcon> Contact</Link>  
          <Link to="/cart"><SvgIcon fontSize="inherit"><ShoppingCartOutlinedIcon /></SvgIcon> Cart</Link>
          { userInfo ? <Link to="/profile">{userInfo.name}</Link> : <Link to="/signin">
          <SvgIcon fontSize="inherit"><AccountCircleOutlinedIcon /></SvgIcon> Sign in
          </Link>}
        </div>
      </header>
      <aside className="sidebar">
        <h3>Shopping Categories <SvgIcon color="error" fontSize="inherit"><AssignmentOutlinedIcon /></SvgIcon></h3>
        <button className="sidebar-close" onClick={closeMenu}>X</button>
        <SidebarScreen userInfo={userInfo} />
      </aside>
      <main className="main">
        <div className="content">
          <Route path="/" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/cate" component={CateScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/about" component={AboutScreen} />
          <Route path="/contact" component={ContactScreen} />
        </div>
      </main>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Grid container spacing={4} justify="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {footer.title}
                </Typography>
                <ul>
                  {footer.description.map((item) => (
                    <li key={item}>
                      <Link to="/" variant="subtitle1" color="textSecondary">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Grid>
            ))}
          </Grid>
        </Container>
          <Box mt={5} className="footer">
            <Copyright />      
          </Box>
      </footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
