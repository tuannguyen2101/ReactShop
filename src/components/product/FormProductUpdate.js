import axios from "axios";
import { useEffect, useState } from "react";

function FormProductUpdate({
  onSubmitHanler,
  formInputOnChange,
  formData,
  btnXoaFormOnClick,
  ListSanPham,
}) {
  const url = "https://60122c99dec56a00172b6204.mockapi.io/api/categories";
  const [listCate, setListCate] = useState([]);

  useEffect(function () {
    axios
      .get(url)
      .then(function (res) {
        const { data } = res;
        setListCate(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  var element = listCate.map((value, index) => {
    return (
      <option key={index} value={value.id}>
        {value.name}
      </option>
    );
  });

  const [cate, setCate] = useState("-1");

  const onChaneHandler = function (event) {
    const { name, value } = event.target;
    setCate(value);
  };

  return (
    <div className="mt-5 d-flex justify-content-center">
      <form onSubmit={onSubmitHanler} className="col-10">
        <div className="form-group row">
          <label className="col-3 col-form-label">Id</label>
          <div className="col-9">
            <input
              value={formData.id}
              onChange={formInputOnChange}
              type="text"
              name="id"
              disabled
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Name</label>
          <div className="col-9">
            <input
              value={formData.name}
              onChange={formInputOnChange}
              type="text"
              name="name"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Image</label>
          <div className="col-9">
            <input
              value={formData.image}
              onChange={formInputOnChange}
              type="text"
              name="image"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Price</label>
          <div className="col-9">
            <input
              value={formData.price}
              onChange={formInputOnChange}
              type="number"
              name="price"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-3 col-form-label">Id Categories</label>
          <div className="col-9">
            <input
              value={formData.idcategories}
              onChange={formInputOnChange}
              type="number"
              name="idcategories"
              className="form-control"
            />
          </div>
        </div>

        {/* <div className="form-group row">
          <label className="col-2 col-form-label">Categories</label>
          <div className="col-10">
            {ListSanPham.map((value) => {
              
              <select
              onChange={onChaneHandler}
              name="idcategories"
              className="form-control"
              aria-label="Default select example"
              >
              {element}
            </select>
            })}
          </div>
        </div> */}

        <div className="mt-3 d-flex justify-content-center">
          <button className="btn btn-primary col-4">Save</button>
          <button
            type="reset"
            onClick={btnXoaFormOnClick}
            className="btn btn-danger col-4"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProductUpdate;
