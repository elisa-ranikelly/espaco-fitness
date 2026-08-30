import { useLocation } from "react-router-dom";
import Cabecalho from "../componentes/Cabecalho";
import { Link } from "react-router-dom";
import "../estilos/compraFinalizada.css";

function CompraRealizada(){

    const location = useLocation();
    const produtosSelecionados = location.state.produtosSelecionados;

    return(
        <div className="compra-finalizada-container">
            
            <div className="cabecalho-catalogo">
                <Cabecalho />
                <Link to="/catalogo" className="link-carrinho">Catálogo 
                </Link>
            </div>

            <div className="catalogo-titulo">
                <h1>COMPRA FINALIZADA</h1>
                <p>Confira os detalhes da sua compra</p>
            </div>

            <div className="lista-produtos">
                {produtosSelecionados.map(produto => {
                    return (
                        <div className="informacoes">
                            <h2>{produto.titulo}</h2>
                            <p>Tamanho: {produto.tamanho}</p>
                            <p>Quantidade: {produto.quantidade}</p>
                            <p>Preço: R${produto.preco}</p>
                            <p>Total: R${(produto.preco * produto.quantidade).toFixed(2)}</p>
                        </div>
                    )
                })}
            </div>

            <div className="link-voltar-loja">
                <Link to="/catalogo">Voltar para a Loja</Link>
            </div>
        </div>
    );
}

export default CompraRealizada;