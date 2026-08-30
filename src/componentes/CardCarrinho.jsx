import "../estilos/cardCarrinho.css";
import { FiTrash2  } from 'react-icons/fi';
import { useContext, useEffect, useState } from "react";
import CarrinhoContext from "../context/CarrinhoContext";
import { toast } from "react-toastify";

function CardCarrinho({product}){

    const { carrinho, setCarrinho} = useContext(CarrinhoContext);

    const produtoEncontrado = carrinho.find(produto => produto.id === product.id && produto.tamanho === product.tamanho);

    const [produto, setProduto] = useState("");

    useEffect(() => {
        async function CarregarProduto() {

            try{
                const response = await fetch("/products.json");
                const data = await response.json();
                const resultado = data.produtos.find(produto => produto.id === product.id);

                setProduto(resultado);
            }catch(error){
                toast.error("Erro ao carregar o produto!");
            }
        }
        CarregarProduto();
    }, [])

    function marcarComoSelecionado(){

        if(produtoEncontrado){

            let novoCarrinho = carrinho.map(produto => { 
                
                if(produto.id === product.id && produto.tamanho === product.tamanho){
                    return {...produto, selecionado: !produto.selecionado}
                }
                return produto;
            });
            setCarrinho(novoCarrinho);
        }
    }

    function diminuirQuantidade(){
        if(produtoEncontrado.quantidade > 1){
            
            let novoCarrinho = carrinho.map(produto => {
                
                if(produto.id === product.id && produto.tamanho === product.tamanho){
                    return {...produto, quantidade: produto.quantidade - 1};
                }else{
                    return produto;
                }
            });
            setCarrinho(novoCarrinho);
        }else{
            toast.info("Precisa ter pelo menos um item!");
            return;
        }
    }

    function aumentarQuantidade() {
        const quantidadeDisponivel = produto.quantidade[product.tamanho];

        let novoCarrinho = carrinho.map(produto => {

            if (produto.id === produtoEncontrado.id &&
                produto.tamanho === produtoEncontrado.tamanho
            ) {

                if (produto.quantidade + 1 <= quantidadeDisponivel) {
                    return {
                        ...produto,
                        quantidade: produto.quantidade + 1
                    };
                } else {
                    toast.info("Quantidade indisponível no estoque!");
                    return produto;
                }

            } else {
                return produto;
            }
        });

        setCarrinho(novoCarrinho);
    }

    function removerItem(){
        if(produtoEncontrado){
            let novoCarrinho = carrinho.filter(produto => {
                return !(produto.id === produtoEncontrado.id && produto.tamanho === produtoEncontrado.tamanho);
            });

            setCarrinho(novoCarrinho);
        }
    }


    return(
        <div className="card-carrinho">
            <input 
                type="checkbox"
                className="checkbox-carrinho"
                onChange={marcarComoSelecionado}
                checked={product.selecionado}/>

            <img src={product.imagem} alt={product.titulo}/>

            <div className="info-carrinho">

                <h2>{product.titulo}</h2>
                <p><strong>R${product.preco.toFixed(2)}</strong></p>

                <p>Tamanho: {product.tamanho}</p>

                <p>Quantidade: {product.quantidade}</p>

                <div className="btn-quantidade">

                    <button className="btn-menos" onClick={diminuirQuantidade}>-</button>
                    <p className="p-quantidade">{product.quantidade}</p>
                    <button className="btn-mais" onClick={aumentarQuantidade}>+</button>

                </div>

                <div className="remover-carrinho">
                    <button className="btn-remover" onClick={removerItem}><FiTrash2 className="icone-remover"/> Remover do Carrinho</button>
                </div>
            </div>
        </div>
    );
}

export default CardCarrinho;