import Cabecalho from "../componentes/Cabecalho";
import "../estilos/comoFiz.css";

function ComoFiz() {
  return (
    <div className="container-como-fiz">
        <div className="cabecalho-catalogo">
            <Cabecalho />
        </div>

        <div className="catalogo-titulo">
            <h1>Como Fiz</h1>
            <p>Neste vídeo apresento o desenvolvimento da minha loja virtual,
            explicando as principais tecnologias e funcionalidades utilizadas, além de compartilhar alguns impedimentos e dificuldades encontradas.</p>
        </div>

        <div className="video">
            <iframe 
                src="https://www.youtube.com/embed/jFPk45-n6VU?si=c8TmtO5muIenUp-f" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
    </div>
  );
}

export default ComoFiz;