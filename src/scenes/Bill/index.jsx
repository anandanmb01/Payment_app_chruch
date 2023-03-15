import React, { useState,useEffect } from "react";
import {Box , Button ,TextField, MenuItem  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { mockDataInvoices } from "../../data/mockData";
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

export default function Form() {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [inputValue, setInputValue] = useState('');

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        address:"",
        date:"",
        item:"",
        amount:"",
      });

const initialValues ={
    name:"",
    address:"",
    id:"",
    date:"",
    item:"",
    amount:"",
};



const userSchema =yup.object().shape({
    name: yup.string().notRequired(),
    address: yup.string().notRequired(),
    id: yup.number().required("required").positive().integer(),
    date : yup.date().required("required").max(new Date()),
    item : yup
    .string()
    .required('required')
    .oneOf(['option1', 'option2', 'option3'], 'Invalid option selected'),
    amount: yup.number().required("required").positive().integer(),
});

useEffect(() => {
    // This code will be executed every time the component mounts or inputValue changes
    setInputValue('');
  }, [inputValue]);

    return (<Box m="20px">
        <Header title= "BILLS" subtitle="Add Payment"/>
            
            <Formik
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        setTimeout(() => {
                        console.log(formData);
                        setFormData(values);
                        
                        setSubmitting(false); // Set isSubmitting to false here
                        resetForm(); 
                        }, 1000);
                      }}
                      initialValues={initialValues}
                      validationSchema={userSchema}
                      >
            {({ values,errors,touched, handleBlur,handleChange,isSubmitting})=> (
                <form 
                  action="http://localhost:8000/server.php"
                  method="post"
                  >
                    <Box display="grid" gap="30px" 
                    gridTemplateColumns="repeat(4,minmax(0, 1fr))" 
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}>
                            <TextField 
                           fullWidth
                           variant="filled"
                           type ="number"
                           label ="Id"
                           onBlur={handleBlur}
                           onChange={(e) => {
                            handleChange(e);
                            const id = e.target.value;
                            const invoice = mockDataInvoices.find((invoice) => invoice.id.toString() === id.toString());
                            if (invoice) {
                              setFormData({
                                ...formData,  
                                name: invoice.name,
                                address: invoice.address,
                              });
                            }
                          }}
                           value={values.id}
                           name ="id"
                           error ={!! touched.id && !!errors.id}
                           helperText = {touched.id && errors.id}
                           sx={{ gridColumn: "span 2" }}
                           
                        />
                        <TextField 
                           fullWidth
                           variant="filled"
                           type ="text"
                           label ="Name"
                           onBlur={handleBlur}
                           onChange ={handleChange}
                           value={formData.name}
                           name ="name"
                           error ={!! touched.name && !!errors.name}
                           helperText = {touched.name && errors.name}
                           sx={{ gridColumn: "span 2" }}
                           
                        />
                        <TextField 
                           fullWidth
                           variant="filled"
                           type ="text"
                           label ="Address"
                           onBlur={handleBlur}
                           onChange ={handleChange}
                           value={formData.address}
                           name ="address"
                           error ={!! touched.address && !!errors.address}
                           helperText = {touched.address && errors.address}
                           sx={{ gridColumn: "span 2" }}
                           
                           
                        />

                        <TextField 
                           fullWidth
                           variant="filled"
                           type ="date"
                           label ="Date"
                           InputLabelProps={{
                            style: { marginTop: "-10px" } // add some margin to the top of the label
                          }}
                           onBlur={handleBlur}
                           onChange ={handleChange}
                           value={values.date}
                           name ="date"
                           error ={!! touched.date && !!errors.date}
                           helperText = {touched.date && errors.date}
                           sx={{ gridColumn: "span 2" }}
                        />
                        <TextField 
                           fullWidth
                           variant="filled"
                           type ="text"
                           label ="Item"
                           onBlur={handleBlur}
                           onChange ={handleChange}
                           value={values.item}
                           name ="item"
                           error ={!! touched.item && !!errors.item}
                           helperText = {touched.item && errors.item}
                           sx={{ gridColumn: "span 2" }}
                           select>
                                   <MenuItem value="option1">Option 1</MenuItem>
                                    <MenuItem value="option2">Option 2</MenuItem>
                                    <MenuItem value="option3">Option 3</MenuItem>

                                    </TextField>
                                    
                        <TextField 
                           fullWidth
                           variant="filled"
                           type ="number"
                           label ="Amount"
                           onBlur={handleBlur}
                           onChange ={handleChange}
                           value={values.amount}
                           name = "amount"
                           error ={!! touched.amount && !!errors.amount}
                           helperText = {touched.amount && errors.amount}
                           sx={{ gridColumn: "span 2" }}
                           
                        />

                    </Box>
                    <Box display="flex" justifyContent="center" mt="20px">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                startIcon={
                  isSubmitting ? <CircularProgress size={20} /> : null
                }
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Box>
                </form>
            )}
        </Formik>
    </Box>
    );

};