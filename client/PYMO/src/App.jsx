import { useState } from "react";
import "./App.css";
import RegisterScreen from "./components/RegisterScreen";
import Layout from "./components/layout/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-screen h-screen">
      <Layout>
        <RegisterScreen />
      </Layout>
    </div>
  );
}

export default App;
