import React from "react";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import Form from "./Form";
import Box from "@mui/material/Box";

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

const Category = () => {
  const [type, setType] = useState(0);
  const [name, setName] = useState("");

  return (
    <>
      <Grid item xs={6}>
        <TextField
          id="filled-basic"
          label="Name"
          variant="filled"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
          }}
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <Form type={type} name={name} />
      </Grid>
    </>
  );
};

export default Category;
