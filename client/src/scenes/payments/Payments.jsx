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
                    out.push({ ...d, id: i + 1 });
                })
                setTransactions(out);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);



    console.log(transactions);
    const columns = [
        { field: "id", headerName: "ID" },
        { field: "date", headerName: "Date" },
        {
            field: "jd", headerName: "JF",
            flex: 1,
            cellClassName: "name-column-cell",
        },
        {
            field: "billno", headerName: "Bill Number",
            type: "number",
            flex: 1,
            headerAlign: "left",
            align: "left",
        },
        {
            field: "category", headerName: "Category",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "name", headerName: "Name",
            type: "number",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "family", headerName: "Family",
            headerAlign: "left",
            align: "left",
            flex: 1,
        },
        {
            field: "amount", headerName: "Amount",
            headerAlign: "left",
            align: "left",
            flex: 1,
        }
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="List of the members" />
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