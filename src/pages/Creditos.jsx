// Atualizado: Creditos.jsx com exibição de cotas totais e disponíveis
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavbarLayout from "../components/Navbar";

export default function Creditos() {
    const [creditos, setCreditos] = useState([]);

    useEffect(() => {
        axios.get("${import.meta.env.VITE_API_URL}/api/creditos")
            .then((res) => setCreditos(res.data))
            .catch((err) => console.error("Erro ao buscar créditos:", err));
    }, []);

    return (
        <NavbarLayout>
            <h2 className="text-2xl font-bold text-center mb-6 select-none cursor-default">
                Créditos Judiciais Disponíveis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto select-none cursor-default">
                {creditos.map((c) => {
                    const adquiridas = c.cotas?.reduce((soma, cota) => soma + cota.quantidade, 0) || 0;
                    const disponiveis = c.quantidadeCotas - adquiridas;

                    return (
                        <Link
                            to={`/creditos/${c.id}`}
                            key={c.id}
                            className="block bg-white border border-gray-200 rounded-2xl shadow-md p-5 space-y-2 transition hover:shadow-lg text-black"
                        >
                            <p className="text-sm">
                                <span className="font-semibold text-yellow-600">💰 Expectativa de recebimento:</span>{" "}
                                {c.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-blue-700">📚 Área:</span> {c.area}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-purple-700">⚖️ Fase:</span> {c.fase}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-red-600">📝 Matéria:</span> {c.materia}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-cyan-700">📉 Deságio:</span> {c.desagio}%
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold text-emerald-700">🏷️ Valor de aquisição:</span>{" "}
                                {c.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </p>
                          
                        </Link>
                    );
                })}
            </div>
        </NavbarLayout>
    );
}
