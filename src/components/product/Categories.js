import { useState, useEffect } from "react";
import axios from "axios";
import FormCate from "./FormCategories";
import ListCate from "./ListCatagories";

function Categories() {
  const formCategoriesInit = {
    id: "",
    name: "",
  };
  const url = "https://60122c99dec56a00172b6204.mockapi.io/api/categories/";
  const [listCate, setListCate] = useState([]);
  const [formCate, setFormCate] = useState(formCategoriesInit);
  const [clickRow, setClickRow] = useState(-1);

  useEffect(function () {
    axios
      .get(url)
      .then(function (response) {
        // Destructuring - ES6
        const { data } = response;
        setListCate(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const btnDeleteOnClick = function (event, value, index) {
    axios
      .delete(url + value.id)
      .then(function (response) {
        const List = listCate.filter(function (val, idx) {
          console.log(val, idx);
          return idx == index ? false : true;
        });
        setListCate(List);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formInputOnChange = function (event) {
    const { name, value } = event.target;

    // spred Operator - ES6
    setFormCate({
      ...formCate,
      [name]: value,
    });
  };

  const onCreate = function () {
    axios
      .post(url, formCate)
      .then(function (response) {
        if (formCate.name === "") {
          return;
        } else {
          const { data } = response;
          setListCate([...listCate, data]);
          setFormCate(formCategoriesInit);
        }
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  };

  const onUpdate = function () {
    const urlUpdate = url + formCate.id;
    axios
      .put(urlUpdate, formCate)
      .then(function (response) {
        const { data } = response;
        const List = listCate.map(function (val, idx) {
          if (idx == clickRow) {
            return data;
          } else {
            return val;
          }
        });
        setListCate(List);
        setClickRow(-1);
        setFormCate(formCategoriesInit);
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
      });
  };

  const onSubmitHanler = function (event) {
    event.preventDefault();
    if (clickRow == -1 && formCate.name !== '') {
      onCreate();
    } else {
      onUpdate();
    }
  };

  const btnUpdateOnClick = function (event, value, index) {
    console.log(value, index);
    setFormCate(value);
    setClickRow(index);
  };

  const btnXoaFormOnClick = function (event) {
    event.preventDefault();
    setFormCate(formCategoriesInit);
    setClickRow(-1);
  };

  return (
    <div className="App">
      <FormCate
        onSubmitHanler={onSubmitHanler}
        formInputOnChange={formInputOnChange}
        formData={formCate}
        btnXoaFormOnClick={btnXoaFormOnClick}
      />
      <ListCate
        listCate={listCate}
        btnUpdateOnClick={btnUpdateOnClick}
        btnDeleteOnClick={btnDeleteOnClick}
      />
    </div>
  );
}

export default Categories;
