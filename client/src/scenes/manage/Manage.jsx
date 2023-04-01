import React from "react";
import Header from "../../components/Header";
import { Button, Paper } from "@mui/material";
import { Grid } from "@mui/material";
import Category from "./Category";
import Member from "./Member";
import CatList from "./CatList";
import MemberList from "./MemberList";


function Manage() {
  const [select, setSelect] = React.useState("category");

  return (
    <div>
      <Header title="Manage" subtitle="Managment" />
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setSelect("category");
                }}
              >
                Category
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => {
                  setSelect("member");
                }}
              >
                Member
              </Button>
            </Grid>
            {select === "category" ? <Category /> : <Member />}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ m: 5, p: 2 }}>
          {select === "category" ? <CatList /> : <MemberList />}
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Manage;
