import { makeStyles, TextField } from "@material-ui/core";

function FormCate({
  onSubmitHanler,
  formInputOnChange,
  formData,
  btnXoaFormOnClick,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "70ch",
        align: "center",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className="mt-5 d-flex justify-content-center">
      <form onSubmit={onSubmitHanler} className="col-4">
        <div className={classes.root}>
          <TextField
            id="standard-basic"
            label="ID"
            variant="outlined"
            value={formData.id}
            onChange={formInputOnChange}
            type="text"
            name="id"
            disabled
            className="form-control"
          />
        </div>

        <div className={classes.root}>
          {/* <label className="col-2 col-form-label">Name</label> */}
          <div>
            <TextField
              id="standard-basic"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={formInputOnChange}
              type="text"
              name="name"
              className="form-control"
            />
          </div>
        </div>

        <div align="center">
          <div>
            <button className="btn btn-primary col-2">Luu</button>
          </div>
          <div>
            <button
              type="reset"
              onClick={btnXoaFormOnClick}
              className="btn btn-danger col-2"
            >
              Xoa form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormCate;
