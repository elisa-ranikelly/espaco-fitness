import { Route, Routes } from "react-router-dom";
import "./App.css";
import Catalogo from "./pages/Catalogo";
import Home from "./pages/Home";
import DetalheProduto from "./pages/DetalheProduto";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carrinho from "./pages/Carrinho";
import CompraRealizada from "./pages/CompraRealizada";
import ComoFiz from "./pages/ComoFiz";


function App(){
  return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/detalhes-produto/:id" element={<DetalheProduto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/compra-realizada" element={<CompraRealizada />} />
        <Route path="/como-fiz" element={<ComoFiz />} />
      </Routes>
      
      <ToastContainer>
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      </ToastContainer>
    </>
  );
};

export default App;
