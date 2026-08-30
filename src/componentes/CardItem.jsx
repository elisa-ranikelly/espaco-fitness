import { Link } from "react-router-dom";
import "../estilos/cardItem.css";

function CardItem({ product}){
    return(
        <Link to={`/detalhes-produto/${product.id}`} className="link-detalhes-produto">
            <div className="card-itens">
            
                <img src={`${import.meta.env.BASE_URL}${product.imagem.replace(/^\//, "")}`} alt={product.titulo} className="img-produto"/>
                <div className="info-catalogo">
                    <h2>{product.titulo}</h2>
                    <p>Cor: {product.cor}</p>
                    <p><strong>R${product.preco.toFixed(2)}</strong></p>
                </div>
            </div>
        </Link>
    );
}

export default CardItem;