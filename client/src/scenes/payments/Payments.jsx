import { useTheme, Box, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import React from "react";
import axios from "axios";

const Payments = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        axios
            .post(`${global.serverurl}/query/getpayments`)
            .then((res) => {
                let out = [];
                res.data.map((d, i) => {
                    let credit = d.amount > 0 ? d.amount : null
                    let debit = d.amount < 0 ? -1 * d.amount : null
                    out.push({
                        ...d,
                        credit: credit,
                        debit: debit,
                        id: i + 1
                    });
                })
                setTransactions(out);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    console.log(transactions);
    const columns = [
        { field: "date", headerName: "Date" },
        {
            field: "jf", headerName: "JF", width: 50, headerAlign: "center",
            align: "center",
        },
        {
            field: "billno", headerName: "Bill No",
            type: "number",
            flex: 0.2,
            headerAlign: "left",
            align: "left",
            border: '1px solid black',
        },
        {
            field: "category", headerName: "Category",
            type: "text",
            headerAlign: "left",
            align: "left",
            flex: 0.7,
            cellClassName: 'category-cell',
        },
        { field: "persid", headerName: "ID", width: 50 },
        {
            field: "family", headerName: "Family",
            type: "text",
            headerAlign: "left",
            align: "left",
            flex: 0.7,
            cellClassName: 'family-cell',

        },
        {
            field: "name", headerName: "Name",
            headerAlign: "left",
            align: "left",
            flex: 0.6,
            cellClassName: 'name-cell',
        },
        {
            field: "credit", headerName: "Credit",
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        },
        {
            field: "debit", headerName: "Debit",
            headerAlign: "left",
            align: "left",
            flex: 0.2,
        }
    ];


    return (
        <Box m="20px">
            <Header title="TRANSACTIONS" subtitle="List of the transactions" />
            <Box m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column-cell": {
                        color: colors.greenAccent[100]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.primary[400],
                        borderBottom: "none"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[700]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`
                    }

                }}>
                <DataGrid
                    rows={transactions}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}
export default Payments;