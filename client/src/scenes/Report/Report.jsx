import * as React from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Credit from "./Credit";
import Spent from "./Spent";
import CreditSummary from "./CreditSummary";
import SpentSummary from "./SpentSummary";
import Summary from "./Summary";
import ItemSummary from "./ItemSummary";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Report() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box m="20px">
      <Header title="Report" subtitle="Report" />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Credit" {...a11yProps(0)} />
            <Tab label="Credit summary" {...a11yProps(1)} />
            <Tab label="Spent" {...a11yProps(2)} />
            <Tab label="Spent summary" {...a11yProps(3)} />
            <Tab label="Summary" {...a11yProps(4)} />
            <Tab label="Specific summary" {...a11yProps(5)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Credit />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreditSummary />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Spent />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SpentSummary />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Summary />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ItemSummary />
        </TabPanel>
      </Box>
    </Box>
  );
}
