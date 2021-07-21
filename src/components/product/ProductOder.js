import { useState, useEffect } from 'react';
import axios from 'axios';
import ListProductOder from './ListProductOder';
import React from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CartOder from './CartOder';

const useStyles = makeStyles((theme) => ({
  div: {
    padding: 20,
    color: 'blue',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: theme.spacing(0, 1, 0, 1),
    marginBottom: theme.spacing(1),
  },
}));

function ProductOder() {

  const formCartInit = {
    id: '',
    name: '',
    price: '',
    image: '',
    status: 'false',
    idcategories: '',
  }

  const [ListSanPham, setListSanPham] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  let pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit);
  const limit = 10;
  const url = 'https://60122c99dec56a00172b6204.mockapi.io/api/cars?limit=' + limit + '&page=' + page;
  const urlCart = 'https://60122c99dec56a00172b6204.mockapi.io/api/Cart/';


  useEffect(function () {
    axios.get(url)
      .then(function (res) {
        const { data } = res;
        setListSanPham(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page, url]);


  const [formCart, setFormCart] = useState(formCartInit);
  const [listCart, setListCart] = useState([]);
  const [setClickRow] = useState(-1);

  useEffect(function () {
    axios.get(urlCart)
      .then(function (res) {
        const { data } = res;
        setListCart(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page, url]);

  const addOnClick = function (event, value, index) {
    
    formCart.id = value.id;
    formCart.name = value.name;
    formCart.price = value.price;
    formCart.image = value.image;
    formCart.idcategories = value.idcategories;

    console.log(value, index);
    console.log(formCart);
    console.log(listCart);
    
    setFormCart(value);
    setClickRow(index);
    
    event.preventDefault();
    onCreate();
  }

  const onCreate = function () {
    axios.post(urlCart, formCart)
      .then(function (res) {
        const { data } = res;
        setListCart([
          ...listCart,
          data
        ]);
        setFormCart(formCartInit);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const nextPage = function () {
    setPage(page + 1);
    console.log('page:', page)
  }

  const previosPage = function () {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  }

  const btnDeleteOnClick = function (event, value, index) {
    axios.delete(urlCart + value.id)
      .then(function (res) {
        const List = listCart.filter(function (val, idx) {
          console.log(val, idx);
          return idx === index ? false : true;
        });
        setListCart(List);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const classes = useStyles();
  return (

    <div className="App">
      <Grid container>
        <Grid item sm={8}>
          <Paper className={classes.paper}>
            <ListProductOder
              ListSanPham={ListSanPham}
              addToCart={addOnClick}
              next={nextPage}
              pre={previosPage}
              pagenumb={page}
            />
          </Paper>
        </Grid>
        <Grid item sm={4}>
          <Paper className={classes.paper}>
            <CartOder
              listCart={listCart}
              btnDeleteOnClick={btnDeleteOnClick}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductOder;