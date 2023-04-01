import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import { Divider } from "@mui/material";

export default function CatList() {
  const [catList, setCatList] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`${global.serverurl}/query/getcategory`)
      .then((d) => {
        setCatList(d.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(catList);

  function Loop() {
    return catList.map((cat) => {
      return (<>
        <ListItem disablePadding key={cat.id} sx={{p:1,px:3}}>
          <ListItemIcon>
            {cat.rec_type === 0 ? <RestartAltIcon/> : cat.rec_type === 1 ? <TaskAltIcon/> :<CallMergeIcon/>}
          </ListItemIcon>
          <ListItemText primary={cat.name} />
        </ListItem>
        <Divider/>
        </>
      );
    });
  }


  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List sx={{
        overflow: 'auto',
        maxHeight: '70vh',
        width: "90%"
      }}>

          <Loop/>
        </List>
      </nav>
    </Box>
  );
}
