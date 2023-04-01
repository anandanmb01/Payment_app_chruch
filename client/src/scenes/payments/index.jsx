import * as React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";

export default function index() {
  return (
    <Box m="20px">
      <Header title="Transactions" subtitle="Report" />
    </Box>
  );
}
