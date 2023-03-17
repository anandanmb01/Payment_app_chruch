import React, { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Autocomplete } from "@mui/material";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";

function Form(props) {
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(null);
  const [catlist, setCatlist] = useState([]);
  const [rec_select, set_rec_select] = useState(null);

  useEffect(() => {
    axios
      .post(`${global.serverurl}/query/category/getall_non_recrussive_main`)
      .then((d) => {
        const t = [];
        for (let i = 0; i < d.data.length; i++) {
          t.push(d.data[i].name);
        }
        setCatlist(t);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  switch (props.type) {
    case 0:
      function send() {
        if (props.name) {
          axios
            .post(`${global.serverurl}/create/category/non_recrussive_main`, {
              name: props.name,
              remark: remark,
            })
            .then((d) => {
              console.log(d);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }

      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="filled-basic"
              label="Remarks"
              variant="filled"
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                send();
              }}
            >
              create
            </Button>
          </Grid>
        </Grid>
      );
    case 1:
      function click() {
        if (props.name) {
          axios
            .post(`${global.serverurl}/create/category/recrussive`, {
              name: props.name,
              amount: amount,
              date: date.$D,
              month: date.$M,
              remark: remark,
            })
            .then((d) => {
              console.log(d);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="filled-basic"
              label="Amount"
              variant="filled"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Trigger date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                click();
              }}
            >
              create
            </Button>
          </Grid>
        </Grid>
      );
    case -1:
      function click_() {
        axios.post(`${global.serverurl}/create/category/non_recrussive_join`, {
          name: props.name,
          category: rec_select,
        }).then((d)=>{console.log(d);})
        .catch((e)=>{console.log(e);})
      }

      return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              disablePortal
              id="recrussive category"rec_select
              options={catlist}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="recrussive category" />
              )}
              value={rec_select}
              onChange={(event, newValue) => {
                set_rec_select(newValue);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                click_();
              }}
            >
              create
            </Button>
          </Grid>
        </Grid>
      );

    default:
      // code block
      return <div></div>;
  }
}

export default Form;
