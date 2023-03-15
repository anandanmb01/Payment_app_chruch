import {useTheme , Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {mockDataInvoices} from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from "../../components/Header";
import { color } from "@mui/system";
import { BorderBottom } from "@mui/icons-material";

const Payments = ()=> {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        {field:"id", headerName: "ID"},
        {
            field: "name",headerName:"Name",
            flex: 1, 
            cellClassName: "name-column-cell",
        },
        {
            field: "email",headerName:"Email",
            type:"number", 
            flex:1,
            headerAlign:"left",
            align:"left",
        },
        {
        field: "cost",headerName:"Cost",
        type:"number", 
        headerAlign:"left",
        align:"left",
        },
        {
            field: "phone",headerName:"Phone Number",
            type:"number",
            headerAlign:"left",
            align:"left", 
            flex:1,
        },
        {
            field: "date",headerName:"Date",
            headerAlign:"left",
            align:"left", 
            flex:1,
        },
        // {
        //     field: "access",headerName:"Access Level",
        //     flex:1,
        //     renderCell: ({row:{access}})=>{
        //         return (
        //             <Box width = "60%"
        //             m="0 auto"
        //             p ="5px"
        //             display = "flex"
        //             justifyContent="center"
        //             backgroundColor ={
        //                 access ==="admin"
        //                 ? colors.greenAccent[600]
        //                 : colors.greenAccent[700]
        //             }
        //             borderRadius = "4px"
        //             >
        //                 {access === 'admin' && <AdminPanelSettingsOutlinedIcon/>}
        //                 {access === 'manager' && <SecurityOutlinedIcon/>}
        //                 {access === 'uder' && <LockOpenOutlinedIcon/>}
        //                 <Typography color ={colors.grey[100]} 
        //                 sx={{ml:"5px"}}>
        //                     {access}
        //                 </Typography>
        //             </Box>
        //         )
        //     }
        // },
    ];
    
    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="List of the members"/>
            <Box m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root":{
                        border: "none",
                    },
                    "& .MuiDataGrid-cell":{
                        borderBottom:"none"
                    },
                    "& .name-column-cell":{
                        color:colors.greenAccent[100]
                    },
                    "& .MuiDataGrid-columnHeaders":{
                        backgroundColor: colors.primary[400],
                        borderBottom:"none"
                    },
                    "& .MuiDataGrid-virtualScroller":{
                        backgroundColor: colors.primary[700]    
                    },
                    "& .MuiDataGrid-footerContainer":{
                        borderTop:"none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text":{
                        color:`${colors.grey[100]} !important`
                    }
                    
               }}>
                <DataGrid 
                rows={mockDataInvoices} 
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    )
}
export default Payments;