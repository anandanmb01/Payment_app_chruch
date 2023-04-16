import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Payments from "./scenes/payments/Payments";
import Form from "./scenes/Bill";
import Manage from "./scenes/manage/Manage";
import Transactions from "./scenes/Transactions/Transactions";
import Report from "./scenes/Report/Report";
// import Test3 from "./scenes/Test3";
// import Test4 from "./scenes/Test4";
// import Test5 from "./scenes/Test5";
// import Test6 from "./scenes/Test6";
// import Test7 from "./scenes/Test7";
global.serverurl = "http://127.0.0.1:5000";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/payments" element={<Payments />} />
              {<Route path="/bills" element={<Form />} />}
              {<Route path="/manage" element={<Manage />} />}
              {<Route path="/transactions" element={<Transactions />} />}
              <Route path="/report" element={<Report />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
