import React from "react";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import Form from "./Form";

const types = [
  {
    value: 1,
    label: "Recrussive",
  },
  {
    value: 0,
    label: "Non recrussive main",
  },
  {
    value: -1,
    label: "Non recrussive join",
  },
];


function Manage() {
  const [type, setType] = useState(0);

  return (
    <div>
      <Header title="Manage" subtitle="Add Payment" />

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant="outlined" color="success">
            Category
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" color="success">
            Member
          </Button>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={6}>
          <TextField id="filled-basic" label="Name" variant="filled" />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue={0}
            helperText="Please select category type"
            onChange={(e) => {
              setType(e.target.value);
              // console.log(e.target.value);
            }}
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

      </Grid>
      <Form type={type} />
    </div>
  );
}

export default Manage;
