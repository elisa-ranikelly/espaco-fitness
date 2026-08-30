import Cabecalho from "../componentes/Cabecalho";
import "../estilos/carrinho.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import CarrinhoContext from "../context/CarrinhoContext";
import CardCarrinho from "../componentes/CardCarrinho";
import { toast } from "react-toastify";

function Carrinho(){

    const {carrinho} = useContext(CarrinhoContext);

    const produtosSelecionados = carrinho.filter(produto => produto.selecionado);

    const quantProdutos = produtosSelecionados.reduce((acumulador, produto) => {
        return acumulador + produto.quantidade}, 0);

    const total = produtosSelecionados.reduce((acumulador, produto) => {
        return acumulador + produto.preco * produto.quantidade}, 0);

    const navigate = useNavigate();
    const [compra, setCompra] = useState(false);

    function finalizarCompra() {
        
        if(produtosSelecionados.length === 0){
            toast.error("Selecione os itens que deseja comprar!");
        }else{
            setCompra(true);
            setTimeout(() => {
                navigate("/compra-realizada", {
                    state: {produtosSelecionados}
                });
            }, 1500);
        }
    }

    return (
        <div className="carrinho-container">

            <div className="cabecalho-catalogo">
                <Cabecalho />
                <Link to="/catalogo" className="link-carrinho">Catálogo 
                </Link>
            </div>

            <div className="catalogo-titulo">
                <h1>CARRINHO</h1>
                <p>Confira os itens adicionados e finalize sua compra</p>
            </div>

            <div className="conteudo-carrinho">

                <div className="lista-carrinho">
                    {carrinho.map(produto => {
                        return(
                            <CardCarrinho
                                key={produto.id + produto.tamanho}
                                product={produto}
                            />
                        );
                    })}
                </div>

                <div className="detalhes-compra">
                    <h1>Resumo do Pedido</h1>
                    <p>Total de itens: {quantProdutos}</p>
                    <p>Total: R$ {total.toFixed(2)}</p>

                    <button className="btn-finalizar" onClick={finalizarCompra}>{compra ? "Finalizando..." : "Finalizar Compra"}</button>
                </div>
            </div>
        </div>
    );
}

export default Carrinho;