import BarraPesquisa from "../componentes/BarraPesquisa";
import Cabecalho from "../componentes/Cabecalho";
import { FiShoppingCart  } from "react-icons/fi";
import "../estilos/catalogo.css";
import { Link } from "react-router-dom";
import CardItem from "../componentes/CardItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Catalogo(){

    const [products, setProducts] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState("Todos");

    useEffect(() => {
        async function carregarProdutos() {
            try{
                const response = await fetch("/products.json");
                const data = await response.json();

                if(data.length === 0){
                    toast.info("Não há produtos noo catálogo!");
                }

                setProducts(data.produtos);
            
            }catch(error){
                toast.error("Erro ao carregar os produtos!");
            }
        }

        carregarProdutos();
    }, []);

    const categorias = [...new Set(products.map(product => product.categoria))];

    const produtosFiltrados = products.filter((product) => {
        const matchBusca = product.titulo
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(busca
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase());

        const matchFiltro = filtro === "Todos" 
            ? true 
            : product.categoria === filtro;

        return matchBusca && matchFiltro;

    });

    return(
        <div className="container-catalogo">
            
            <div className="cabecalho-catalogo">
                <Cabecalho />
                <Link to="/carrinho" className="link-carrinho"><FiShoppingCart className="icone-carrinho"/> Carrinho 
                </Link>
            </div>

            <div className="catalogo-titulo">
                <h1>CATÁLOGO DE PRODUTOS</h1>
            </div>

            <div className="busca">
                <BarraPesquisa 
                    busca={busca}
                    setBusca={setBusca}
                />

                <div className="filtro">
                    <select 
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    >
                            <option value="Todos">Todos</option>

                            {categorias.map(categoria => (
                                <option key={categoria} value={categoria}>{categoria}</option>
                            ))}
                    </select>
                </div>
            </div>

            <div className="catalogo-produtos">
                {
                    produtosFiltrados.length > 0 ? (
                        produtosFiltrados.map((product) => (
                            <CardItem 
                                key={product.id}
                                product={product}
                            />
                        ))
                    ) : (
                        <div className="msg-nao-encontrado">
                            <p>Nenhum produto encontrado!</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Catalogo;