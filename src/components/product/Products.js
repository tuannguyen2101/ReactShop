import { useState, useEffect } from 'react';
import axios from 'axios';
import FormProduct from './FormProduct';
import ListProduct from './ListProduct';

function Product() {
    const formDataInit = {
      id: '',
      ten_san_pham: '',
      gia_san_pham: '',
    }
    const url = 'https://60122c99dec56a00172b6204.mockapi.io/api/products/';
    const [ListSanPham, setListSanPham] = useState([]);
    const [formData, setFormData] = useState(formDataInit);
    const [clickRow, setClickRow] = useState(-1);
  
    // Get Data ---------------- fill to table
    useEffect(function () {
      axios.get(url)
        .then(function (response) {
          // Destructuring - ES6
          const { data } = response;
          setListSanPham(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  
    // Button ------------------- Click delete
    const btnDeleteOnClick = function (event, value, index) {
      axios.delete(url + value.id)
        .then(function (response) {
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
  
    // Button ------------------- Click update
    const btnUpdateOnClick = function(event, value, index) {
      console.log(value, index);
      setFormData(value);
      setClickRow(index);
    }
  
    const btnXoaFormOnClick = function(event) {
      event.preventDefault();
      setFormData(formDataInit);
      setClickRow(-1);
  
    }

    // Sau khi click lưu
    const formInputOnChange = function (event) {
      const { name, value } = event.target;
  
      // spred Operator - ES6
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    const onCreate = function () {
      axios.post(url, formData)
        .then(function (response) {
          const { data } = response;
          setListSanPham([
            ...ListSanPham,
            data,
          ]);
  
          setFormData(formDataInit);
        })
        .catch(function (error) {
          console.log('error');
          console.log(error);
        })
    }
  


    const onUpdate = function () {
      const urlUpdate = url + formData.id;
      axios.put(urlUpdate, formData)
        .then(function (response) {
          const { data } = response;
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
          console.log('error');
          console.log(error);
        })
    }
  
    const onSubmitHanler = function (event) {
      event.preventDefault();
      
      if(clickRow === -1) {
        onCreate();
      } else {
        onUpdate();
      }
    }
  
    
  
    return (
      <div className="App">
        <FormProduct 
          onSubmitHanler={ onSubmitHanler }
          formInputOnChange= { formInputOnChange }
          formData= { formData }
          btnXoaFormOnClick= { btnXoaFormOnClick }
        />
        <ListProduct 
          ListSanPham= { ListSanPham }
          btnUpdateOnClick= { btnUpdateOnClick }
          btnDeleteOnClick= { btnDeleteOnClick }
        />
      </div>
    );

}

export default Product;