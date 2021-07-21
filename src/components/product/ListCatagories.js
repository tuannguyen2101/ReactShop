import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    width: 1000,
  },
});

function ListCate({ listCate, btnUpdateOnClick, btnDeleteOnClick }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        aria-label="customized table"
        align="center"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center" width="400">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCate.map((value, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {value.id}
                </StyledTableCell>
                <StyledTableCell align="center">{value.name}</StyledTableCell>
                <StyledTableCell align="center">
                  <button
                    onClick={function (event) {
                      btnUpdateOnClick(event, value, index);
                    }}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                  {/* <button
                    onClick={function (event) {
                      btnDeleteOnClick(event, value, index);
                    }}
                    className="btn btn-danger ml-4"
                  >
                    Delete
                  </button> */}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListCate;
