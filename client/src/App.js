import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes,Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Sidebar  from "./scenes/global/Sidebar";
import Payments from "./scenes/payments";
import Form from "./scenes/Bill";
import Manage from "./scenes/manage/Manage";
// import Test3 from "./scenes/Test3";
// import Test4 from "./scenes/Test4";
// import Test5 from "./scenes/Test5";
// import Test6 from "./scenes/Test6";
// import Test7 from "./scenes/Test7";

function App() {
  const [theme,colorMode] = useMode();
  return (
  <ColorModeContext.Provider value = {colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className="app">
      <Sidebar/>
      <main className="content"> 
      <Topbar/>
      <Routes>
      <Route path="/" element = {<Dashboard/>} />
      <Route path="/payments" element = {<Payments/>} />
      {<Route path="/bills" element = {<Form/>} /> }
      {<Route path="/manage" element = {<Manage/>} /> }
      {/* <Route path="/test3" element = {<test3/>} /> */}
      {/* <Route path="/test4" element = {<test4/>} /> */}
      {/* <Route path="/test5" element = {<test5/>} /> */}
      {/* <Route path="/test6" element = {<test6/>} /> */}
      {/* <Route path="/test7" element = {<test7/>} /> */}
      </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
