import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Box } from "@mui/material";

export default function Member() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var object = {};
    data.forEach(function (value, key) {
      object[key] = value;
    });
    axios
      .post(`${global.serverurl}/insert/member`, { ...object })
      .then((d) => {
        console.log(d);
      })
      .catch((e) => {
        console.log(e);
      });

    window.location.reload(false);
  };

  return (
    <>
     <Box component="form" onSubmit={handleSubmit} noValidate sx={{m:2}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="family"
            name="family"
            sx={{}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            name="name"
            sx={{}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="phone"
            name="phone"
            sx={{}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="reg_id"
            name="reg_id"
            sx={{}}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="remark"
            name="remark"
            sx={{}}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        </Grid>
      </Box>
    </>
  );
}
