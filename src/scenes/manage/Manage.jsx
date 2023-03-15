import React from "react";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";

const types = [
  {
    value: 1,
    label: 'Recrussive',
  },
  {
    value:0,
    label: 'Non recrussive main',
  },
  {
    value: -1,
    label: 'Non recrussive join',
  },
];

function Manage() {

  return (
    <div>
      <Header title="Manage" subtitle="Add Payment" />

      <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Button variant="outlined" color="success">
                        Category
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" color="success">
                        Member
                    </Button>
                </Grid>
                <Grid item xs={6}></Grid>

                <Grid item xs={4}>
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                </Grid>

                <Grid item xs={4}>
                <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue={0}
          helperText="Please select category type"
          onChange={(x)=>{console.log(x)}}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
                </Grid>
                
                <Grid item xs={4}></Grid>
                
                <Grid item xs={6}></Grid>
      </Grid>
    </div>
  );
}

export default Manage;
