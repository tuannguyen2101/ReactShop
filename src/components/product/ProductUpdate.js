import { useState, useEffect } from 'react';
import axios from 'axios';
import ListProductUpdate from './ListProductUpdate';
import FormProductUpdate from './FormProductUpdate';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    // whiteSpace: 'nowrap',
    margin: theme.spacing(0, 5, 0, 5),
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function Product() {
  const formDataInit = {
    id: '',
    name: '',
    price: '',
    image: '',
    material: '',
    status: '',
    idcategories: '',
  }

  const urlParams = new URLSearchParams(window.location.search);
  let pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
  const [page, setPage] = useState(pageInit);
  const limit = 10;
  const url = 'https://60122c99dec56a00172b6204.mockapi.io/api/cars?limit=' + limit + '&page=' + page;
  const url2 = 'https://60122c99dec56a00172b6204.mockapi.io/api/cars/'; // ?limit=' + limit + '&page=' + page
  const [ListSanPham, setListSanPham] = useState([]);
  const [formData, setFormData] = useState(formDataInit);
  const [clickRow, setClickRow] = useState(-1);

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
    axios.delete(url2 + value.id)
      .then(function (res) {
        const List = ListSanPham.filter(function (val, idx) {
          console.log(val, idx);
          return idx === index ? false : true;
        });
        setListSanPham(List);
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  const onCreate = function () {
    axios.post(url2, formData)
      .then(function (res) {
        if (formData.name === '' || formData.price === '') {
          return;
        } else {
          const { data } = res;
          setListSanPham([
            ...ListSanPham,
            data,
          ]);
          setFormData(formDataInit);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const onUpdate = function () {
    const urlUpdate = url2 + formData.id;
    axios.put(urlUpdate, formData)
      .then(function (res) {
        const { data } = res;
        const List = ListSanPham.map(function (val, idx) {
          if (idx === clickRow) {
            return data;
          } else {
            return val;
          }
        });
        setListSanPham(List);
        setClickRow(-1);
        setFormData(formDataInit);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const btnUpdateOnClick = function (event, value, index) {
    console.log(value, index);
    setFormData(value);
    setClickRow(index);
  }

  const formInputOnChange = function (event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const onSubmitHanler = function (event) {
    event.preventDefault();
    if (clickRow === -1 && formData.name !== '' && formData.price !== '') {
      onCreate();
    } else {
      onUpdate();
    }
  }

  const btnXoaFormOnClick = function (event) {
    event.preventDefault();
    setFormData(formDataInit);
    setClickRow(-1);
  }

  const classes = useStyles();
  return (

    <Grid container>
      <Grid item sm={8}>
        <Paper className={classes.paper} elevation={5}>
          <ListProductUpdate
            ListSanPham={ListSanPham}
            btnUpdateOnClick={btnUpdateOnClick}
            btnDeleteOnClick={btnDeleteOnClick}
            next={nextPage}
            pre={previosPage}
            pagenumb={page}
          />
        </Paper>
      </Grid>
      <Grid item sm={4}>
        <FormProductUpdate
          onSubmitHanler={onSubmitHanler}
          formInputOnChange={formInputOnChange}
          formData={formData}
          btnXoaFormOnClick={btnXoaFormOnClick}
          ListSanPham={ListSanPham}
        />
      </Grid>
    </Grid>
  );
}

export default Product;