import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
export default function NPMBill() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [inputValue, setInputValue] = useState("");
  const [catList, setCatList] = useState([]);
  React.useEffect(() => {
    axios
      .post(`${global.serverurl}/query/getmembers`)
      .then((d) => {
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .post(`${global.serverurl}/query/getcategory`)
      .then((d) => {
        setCatList(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log(values);
    setTimeout(() => {
      resetForm();
    }, 1000);

    axios.post(`${global.serverurl}/insert/npmpayment`, values).then((d) => {
      console.log(d);
    });

  }



  const initialValues = {
    name: "",
    family: "",
    id: "",
    date: "",
    category: "",
    amount: "",
    trans_type: "",
    billno: "",
    jf: "",
  };

  const userSchema = yup.object().shape({
    name: yup.string().notRequired(),
    family: yup.string().notRequired(),
    // date: yup.date().required("required").max(new Date()),
    // category: yup.string().required("required"),
    // amount: yup.number().required("required").positive().integer(),
    // trans_type: yup
    //   .string()
    //   .required("required")
    //   .oneOf(["credit", "debit"], "Invalid option selected"),
  });

  useEffect(() => {
    // This code will be executed every time the component mounts or inputValue changes
    setInputValue("");
  }, [inputValue]);

  return (
    <Box m="20px">
      <Header title="BILLS" subtitle="Add Payment" />

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.family}
                name="family"
                error={!!touched.family && !!errors.family}
                helperText={touched.family && errors.family}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                InputLabelProps={{
                  style: { marginTop: "-10px" }, // add some margin to the top of the label
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
                sx={{ gridColumn: "span 2" }}
                select
              >
                {catList.map((d) => {
                  return (
                    <MenuItem key={d.id} value={d.id}>
                      {`${d.name}`}
                    </MenuItem>
                  );
                })}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Bill Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.billno}
                name="billno"
                error={!!touched.billno && !!errors.billno}
                helperText={touched.billno && errors.billno}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="JF"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.jf}
                name="jf"
                error={!!touched.jf && !!errors.jf}
                helperText={touched.jf && errors.jf}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Trans Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.trans_type}
                name="trans_type"
                error={!!touched.trans_type && !!errors.trans_type}
                helperText={touched.trans_type && errors.trans_type}
                sx={{ gridColumn: "span 2" }}
                select
              >
                <MenuItem name="credit" value="credit">Credit</MenuItem>
                <MenuItem name="debit" value="debit">Debit</MenuItem>
              </TextField>


            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );

}
