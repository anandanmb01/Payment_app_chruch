import React from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Autocomplete } from "@mui/material";


function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }


function Form(props) {
    switch (props.type) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="filled-basic" label="Remarks" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="success">
                create
              </Button>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="filled-basic" label="Amount" variant="filled" />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="trigger months"
                options={range(1, 12)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="trigger months" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                id="trigger months"
                options={range(1, 30)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="trigger date" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="success">
                create
              </Button>
            </Grid>
          </Grid>
        );
      case -1:
        return(        <Grid container spacing={2}>
          <Grid item xs={6}>
          <Autocomplete
                disablePortal
                id="recrussive category"
                options={range(1, 30)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="recrussive category" />
                )}
              />
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" color="success">
              create
            </Button>
          </Grid>
        </Grid>);
      default:
        // code block
        return <div></div>;
    }
  }

export default Form