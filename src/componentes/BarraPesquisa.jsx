import { FaSearch } from "react-icons/fa";
import "../estilos/barraPesquisa.css";

function BarraPesquisa( {busca, setBusca}){

    return(
        <div className="barra-pesquisa">
            <FaSearch className="barra-pesquisa-icone" />
            <input 
                type="text"
                placeholder="Buscar na espaço fitness"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
        </div>
    );
};

export default BarraPesquisa;