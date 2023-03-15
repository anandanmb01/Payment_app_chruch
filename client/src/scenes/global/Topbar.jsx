import { Box, IconButton, useTheme } from "@mui/material";
import { useContext} from  "react";
import { ColorModeContext,tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";


const Topbar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return (<Box display="flex" justifyContent="space-between" p={2}>
        <Box 
            display = "flex" 
            backgroundColor = {colors.primary[400]} 
            borderRadius = "3px">
                <InputBase sx = {{ml:2,flex:1}} placeholder = "Search" />
                <IconButton type ="button" sx={{p: 1}}> 
                    <SearchOutlinedIcon />
                </IconButton>

        </Box>
        {/* ICONS*/}
        <Box       
        display= 'flex'
        gap= '1rem'
        marginRight= '1rem'>
            <IconButton onClick = {colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlinedIcon/>
                ):(
                    <LightModeOutlinedIcon/>
                )}
                
            </IconButton>
            
            <IconButton>
                <NotificationsNoneOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon/>
            </IconButton>
            <IconButton>
                <PersonOutlineOutlinedIcon/>
            </IconButton>
        </Box>
    </Box>)
}

export default Topbar;