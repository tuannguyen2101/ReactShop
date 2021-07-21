function FormProduct({ onSubmitHanler, formInputOnChange, formData, btnXoaFormOnClick }) {
  return (
    <div className="mt-5 d-flex justify-content-center">
      <form
        onSubmit={onSubmitHanler}
        className="col-6">
        <div className="form-group row">
          <label className="col-2 col-form-label">Id</label>
          <div className="col-10">
            <input
              value={formData.id}
              onChange={formInputOnChange}
              type='text'
              name="id"
              disabled
              className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label">Ten SP</label>
          <div className="col-10">
            <input
              value={formData.ten_san_pham}
              onChange={formInputOnChange}
              type='text'
              name="ten_san_pham"
              className="form-control" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-2 col-form-label">Gia SP</label>
          <div className="col-10">
            <input
              value={formData.gia_san_pham}
              onChange={formInputOnChange}
              type='number'
              name="gia_san_pham"
              className="form-control" />
          </div>
        </div>

        <div>
          <button className="btn btn-primary">
            Luu
          </button>
          <button
            type="reset"
            onClick={btnXoaFormOnClick}
            className="btn btn-danger ml-4">
            Xoa form
            </button>
        </div>
      </form>
    </div>
  );
}

export default FormProduct;