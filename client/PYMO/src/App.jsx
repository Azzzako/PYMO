import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from "./components/RegisterScreen";
import Layout from "./components/layout/Layout";
import SupplyScreen from "./components/SupplyScreen";

function App() {
  return (
    <div className="h-full w-full">
      <Layout>
        <Router>
          <Routes>
            <Route exact path="/" element={<RegisterScreen />} />
            <Route path="/petitions" element={<SupplyScreen/>}/>
          </Routes>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
