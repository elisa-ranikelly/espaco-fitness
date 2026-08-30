import { createContext, useState } from "react";
import { useEffect } from "react";

const CarrinhoContext = createContext();

function CarrinhoProvider({children}){

    const [carrinho, setCarrinho] = useState(JSON.parse(localStorage.getItem("carrinho")) || []);

    useEffect(() => {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
    });

    return(
        <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export{CarrinhoProvider}

export default CarrinhoContext;