import { useEffect, useState } from "react";
import Cabecalho from "../componentes/Cabecalho";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiShoppingCart  } from "react-icons/fi";
import "../estilos/detalheProduto.css";
import { useContext } from "react";
import CarrinhoContext from "../context/CarrinhoContext";

function DetalheProduto(){

    const {id} = useParams();
    const idNumerico = Number(id);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [quantidade, setQuantidade] = useState(1);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
    const { carrinho, setCarrinho} = useContext(CarrinhoContext);

    //Quero executar uma determinada função quando acontecer de terminada situação
    useEffect(() => {
        async function carregarProduto() {
            try{
                const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
                const data = await response.json();
                const resul = data.produtos.find(product => product.id === idNumerico);

                if(!resul){
                    toast.info("Nenhum produto encontrado!");
                }

                setProdutoSelecionado(resul);
            }catch(error){
                toast.error("Erro ao carregar detalhes do produto!")
            }
        }
        carregarProduto();
    //Array de dependencias -> vazio -> execute esse efeito quando o componente for montado.
    }, [idNumerico]);

    if(produtoSelecionado === ""){
        return <p className="msg-nao-encontrado">Carregando produto...</p>
    }

    function diminuirQuantidade(){
        if(quantidade > 1){
           setQuantidade(quantidade - 1);
        }
    }

    function aumentarQuantidade(){
        if(tamanhoSelecionado === ""){
            toast.info("Selecione o tamanho que deseja!");
            return;
        }

        const quantidadeDisponivel = produtoSelecionado.quantidade[tamanhoSelecionado];

        const produtoNoCarrinho = carrinho.find(produto => produto.id === produtoSelecionado.id && produto.tamanho === tamanhoSelecionado);

        let quantCarrinho = 0;

        if(produtoNoCarrinho){
            quantCarrinho = produtoNoCarrinho.quantidade;
        }

        if(quantCarrinho + quantidade + 1 > quantidadeDisponivel){
            toast.info("Quantidade indisponível para o tamanho escolhido!");
            return;
        }

        setQuantidade(quantidade + 1);
    }

    function selecionarTamanho(tamanhoEscolhido){
        setTamanhoSelecionado(tamanhoEscolhido);
        setQuantidade(1);
    }

    function adicionarCarrinho(){
        if(tamanhoSelecionado === ""){
            toast.info("Selecione um tamanho antes de adicionar ao carrinho!");
            return;
        }

        const produtoAdicionado = {
            id: produtoSelecionado.id,
            titulo: produtoSelecionado.titulo,
            imagem: produtoSelecionado.imagem,
            preco: produtoSelecionado.preco,
            tamanho: tamanhoSelecionado,
            quantidade: quantidade,
            selecionado: false
        };

        const produtoExistente = carrinho.find(produto => produto.id === produtoAdicionado.id && produto.tamanho === produtoAdicionado.tamanho);

        const quantDisponivel = produtoSelecionado.quantidade[tamanhoSelecionado];

        let quantidadeNoCarrinho = 0;

        if(produtoExistente){
            quantidadeNoCarrinho = produtoExistente.quantidade
        }else{
            quantidadeNoCarrinho = 0;
        }

        if(quantidadeNoCarrinho + quantidade > quantDisponivel){
            toast.info("Quantidade indisponível!");
            return;
        }

        if(produtoExistente){
            const novaQuant = carrinho.map(produto => {
                if(produto.id === produtoAdicionado.id && produto.tamanho === produtoAdicionado.tamanho){
                    return {...produto, quantidade: produto.quantidade + produtoAdicionado.quantidade}
                }
                return produto;
            });

            setCarrinho(novaQuant);
        }else{
            const novoProduto = [...carrinho, produtoAdicionado];
            setCarrinho(novoProduto);
        }
        setQuantidade(1);
        toast.success("Produto adicionado ao carrinho com sucesso!");
    }

    function verificarDisponibilidade(tamanho){
        const produtoCarrinho = carrinho.find(produto => produto.id === produtoSelecionado.id && produto.tamanho === tamanho);

        let quantNoCarrinho = 0;

        if(produtoCarrinho){
            quantNoCarrinho = produtoCarrinho.quantidade;
        }

        const quantRestante = produtoSelecionado.quantidade[tamanho] - quantNoCarrinho;

        return quantRestante > 0;
    }

    return(
        <div className="detalhe-produto-container">

            <div className="cabecalho-catalogo">
                <Cabecalho />
                <Link to="/catalogo" className="link-carrinho">
                Catálogo</Link>
            </div>

            <div className="catalogo-titulo">
                <h1>DETALHES DO PRODUTO</h1>
            </div>

            <div className="detalhe-produto">

                <div className="img-detalhe">
                    <img src={`${import.meta.env.BASE_URL}${produtoSelecionado.imagem.replace(/^\//, "")}`} alt={produtoSelecionado.titulo} />
                </div>

                <div className="info-detalhes">
                    <h1>{produtoSelecionado.titulo}</h1>
                    <h2>R${produtoSelecionado.preco}</h2>

                    <div className="info-item">
                        <p><strong>Cor:</strong></p>
                        <p>{produtoSelecionado.cor}</p>
                    </div>

                    <div className="info-item">
                        <p><strong>Tamanho:</strong></p>
                        
                        <div className="tamanhos">

                            {produtoSelecionado.tamanhos.map(tamanho => {
                                return(
                                    <button
                                        key={tamanho}
                                        onClick={() => selecionarTamanho(tamanho)}
                                        disabled={!verificarDisponibilidade(tamanho)}
                                        className={tamanhoSelecionado === tamanho ? "tamanho-selecionado" : ""}>{tamanho}
                                    </button>
                                );
                                
                            })}
                        </div>
                        <p className="p-especial">Guia de tamanhos</p>
                    </div>

                    <div className="info-item">
                        <p><strong>Descrição:</strong></p>
                        <p className="descricao">{produtoSelecionado.descricao}</p>
                    </div>

                    <div className="quant-btn-adicionar">
                        <div className="quantidade">

                            <button onClick={diminuirQuantidade}>-</button>
                            <p className="p-quantidade">{quantidade}</p>
                            <button onClick={aumentarQuantidade}>+</button>

                        </div>

                        <button className="btn-adicionar" onClick={adicionarCarrinho}><FiShoppingCart className="icone-adicionar"/>Adicionar ao Carrinho</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DetalheProduto;