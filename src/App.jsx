import { Route, Routes } from "react-router-dom";
import "./App.css";
import Catalogo from "./pages/Catalogo";
import Home from "./pages/Home";

function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
      </Routes>
    </>
  );
};

export default App;
