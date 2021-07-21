import { Container, Row, Col } from "reactstrap";

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  div: {
    padding: 20,
    color: "blue",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
}));

function CartOder({ listCart, btnDeleteOnClick }) {
  const classes = useStyles();

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


  return (
    <Container>
      <Row>
        <Col sm="5">
          <h1 className={classes.div}>My Cart</h1>
        </Col>
        <Col sm="7">
        </Col>
      </Row>
      {
        <Row>
          {listCart.map(function (value, index) {
            return (
              <Col sm="12" key={value.id}>
                <Container className={classes.root}>
                  <Paper className={classes.paper} elevation={3}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <ButtonBase className={classes.image}>
                          <img
                            className={classes.img}
                            alt="complex"
                            src={value.image}
                          />
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                              Productname: {value.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              Categories:{" "}
                              {listCate.map((val, idx) => {
                                if (value.idcategories + "" === val.id) {
                                  return val.name;
                                }
                              })}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body2"
                              style={{ cursor: "pointer" }}
                            >
                              <button
                                onClick={function (event) {
                                  btnDeleteOnClick(event, value, index);
                                }}
                                className="btn btn-danger ml-4"
                              >
                                Remove
                              </button>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1">
                            {"$" + value.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Container>
              </Col>
            );
          })}
        </Row>
      }
    </Container>
  );
}

export default CartOder;
