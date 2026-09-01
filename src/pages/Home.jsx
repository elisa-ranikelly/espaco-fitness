import { Link } from "react-router-dom";
import "../estilos/home.css";
import Cabecalho from "../componentes/Cabecalho";

function Home(){
    return(
        <div className="home-container">
            
            <Cabecalho />

            <div className="fundo-container">

                <div className="info-home">
                    <h1>SEU TREINO.</h1>
                    <h1>SEU <strong>ESTILO.</strong></h1>
                    <h2>SUA MELHOR VERSÃO.</h2>
                    <p>Roupas fitness de alta qualidade, para te ajudar em cada evolução.</p>
                    
                    <Link className="btn-entrar" to="/catalogo">ENTRAR</Link>
                </div>
            </div>

            <div className="rodape">
                <p>2026 - Espaço fitness. Todos os direitos reservados</p>
                <p><Link className="link-como-fiz" to="/como-fiz">Como fiz</Link></p>
            </div>
        </div>
    );
}

export default Home;