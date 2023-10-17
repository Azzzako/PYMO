import "./App.css";
import RegisterScreen from "./components/RegisterScreen";
import Layout from "./components/layout/Layout";

function App() {


  return (
    <div className="h-full w-full">
      <Layout>
        <RegisterScreen />
      </Layout>
    </div>
  );
}

export default App;
