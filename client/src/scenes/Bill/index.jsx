import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Form() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [inputValue, setInputValue] = useState("");
  const [catList, setCatList] = useState([]);
  const [members, setmembers] = useState([]);

  React.useEffect(() => {
    axios
      .post(`${global.serverurl}/query/getmembers`)
      .then((d) => {
        setmembers(d.data);
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
    setTimeout(() => {
      console.log(formData);
      setFormData(values);
      resetForm();
    }, 1000);
    try {
      const data = {
        ...values,
        name: formData.name,
        family: formData.family,
      };

      axios.post(`${global.serverurl}/insert/payment`, data).then((d) => {
        console.log(d);
      });

      // console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    family: "",
    date: "",
    category: "",
    amount: "",
    trans_type: "",
    billno: "",
    jf: "",
  });

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
    id: yup.number().required("required").positive().integer(),
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
                type="number"
                label="Id"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  const id = e.target.value;
                  const invoice = members.find(
                    (invoice) => invoice.id.toString() === id.toString()
                  );
                  if (invoice) {
                    setFormData({
                      ...formData,
                      name: invoice.name,
                      family: invoice.family,
                    });
                  }
                }}
                value={values.id}
                name="id"
                error={!!touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.name}
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
                value={formData.family}
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
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
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
