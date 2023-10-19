import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import Layout from "./components/layout/Layout";
import SupplyScreen from "./components/SupplyScreen";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="">
      <Layout>
        <Router>
          <Routes>
            <Route exact path="/" element={<RegisterScreen />} />
            <Route path="/petitions" element={<SupplyScreen/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
