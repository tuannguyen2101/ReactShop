import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown, NavLink, } from 'react-bootstrap';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {
  NavbarBrand,
} from 'reactstrap';
import Productder from "./components/product/ProductOder";
import ProductUpdate from "./components/product/ProductUpdate";
import Categories from './components/product/Categories';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    marginRight: '10px',
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
  nav: {
    padding: 20,
    color: 'Blue',
    // marginRight: 10,
    // marginLeft: 20,
  },
  div: {
    padding: 20,
    color: 'blue',
  }
}));


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <NavbarBrand className={classes.nav} href="/">Home</NavbarBrand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link  href="/Oder">Oder</Nav.Link>
          <Nav.Link  href="/Update">Update</Nav.Link>
          <Nav.Link  href="/Categories">Categories</Nav.Link>
            {/* <NavDropdown title="SHOP" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/modelsOder">ODER</NavDropdown.Item>
              <NavDropdown.Item href="/modelsUpdate">Update</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <div>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </Navbar>
      
      
      <Switch>
        <Route path="/Oder">
          <Productder />
        </Route>
        <Route path="/Update">
          <ProductUpdate />
        </Route>
        <Route path="/Categories">
          <Categories />
        </Route>
      </Switch>
      
    </BrowserRouter>
  )
}

export default App;
