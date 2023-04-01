import React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography"

const CreditSummary = () => {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`${global.serverurl}/query/getcreditsummaryreport`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
console.log(transactions);
  return (
    <Box m="20px">
      <Header title="Credit summary" subtitle="Credit report" />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(0).reverse().map((row) => (
              <TableRow
                key={row.category}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.category}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{m:4, display:'flex' , justifyContent:'end'}}>
      {
        (()=>{
          let total=0;
          transactions.map((transaction)=>{total+=transaction.amount;return null});
          return([<Typography component="h6">{`Total : ${total}`}</Typography>])
        })()
      }
        
      </Box>

    </Box>

  );
};

export default CreditSummary;
