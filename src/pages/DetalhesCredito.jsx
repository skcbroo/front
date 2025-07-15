import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavbarLayout from "../components/Navbar";

// ...importações mantidas

export default function DetalhesCredito() {
    const { id } = useParams();
    const [credito, setCredito] = useState(null);
    const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(1);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/creditos/${id}`)
            .then(async res => {
                const json = await res.json();
                if (!res.ok) return setCredito(null);
                setCredito(json);
            })
            .catch(() => setCredito(null));
    }, [id]);

    if (!credito) return (
        <NavbarLayout>
            <p className="text-center mt-10 text-white select-none cursor-default">Carregando...</p>
        </NavbarLayout>
    );

    const desagio = credito.preco / credito.valor;
    const totalCotas = credito.quantidadeCotas || 0;
    const cotasAdquiridas = credito.cotasAdquiridas ?? 0; // <<--- ALTERADO AQUI
    const cotasDisponiveis = totalCotas - cotasAdquiridas;
    const precoPorCota = credito.preco / totalCotas;
    const valorTotal = quantidadeSelecionada * precoPorCota;

    const confirmarAquisicao = () => {
        if (cotasDisponiveis <= 0) {
            alert("Não há cotas disponíveis para este crédito.");
            return;
        }

        const numeroEmpresa = "556135913167"; // Substitua pelo número real da empresa
        const mensagem = encodeURIComponent(
            `Olá, gostaria de adquirir cotas do crédito judicial:\n\n` +
            ` Processo: ${credito.numeroProcesso}\n` +
            ` Quantidade de cotas: ${quantidadeSelecionada}\n` +
            ` Valor total: ${valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}\n\n` +
            `Aguardo o retorno. Obrigado!`
        );

        const link = `https://wa.me/${numeroEmpresa}?text=${mensagem}`;
        window.open(link, "_blank");
    };

    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        if (val > cotasDisponiveis) {
            setQuantidadeSelecionada(cotasDisponiveis);
        } else if (val < 1) {
            setQuantidadeSelecionada(1);
        } else {
            setQuantidadeSelecionada(val);
        }
    };

    return (
        <NavbarLayout>
            <div className="flex justify-center items-center min-h-[80vh] px-4">
                <div className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-xl select-none cursor-default">
                    <h1 className="text-2xl font-bold mb-6 text-center">Detalhes do Crédito</h1>

                    <p className="mb-2"><strong>📄 Processo:</strong> {credito.numeroProcesso || '—'}</p>
                    <p className="mb-4"><strong>📝 Descrição:</strong><br />{credito.descricao || '—'}</p>

                    <p><strong>💰 Expectativa de recebimento:</strong> {credito.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <p><strong>🏷️ Valor de aquisição:</strong> {credito.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <p><strong>📉 Deságio:</strong> {(desagio * 100).toFixed(2)}%</p>

                    <div className="mt-4">
                        <p><strong>📦 Cotas totais:</strong> {totalCotas}</p>
                        <p><strong>🟢 Cotas disponíveis:</strong> {cotasDisponiveis}</p>
                        <p><strong>💵 Preço por cota:</strong> {precoPorCota.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    </div>

                    {cotasDisponiveis > 0 ? (
                        <>
                            <div className="mt-6">
                                <label className="block font-medium mb-1">📤 Quantidade de cotas a adquirir:</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={cotasDisponiveis}
                                    value={quantidadeSelecionada}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                />
                                <p className="mt-2 font-semibold">
                                    Total a pagar: {valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </p>
                            </div>

                            <button
                                onClick={confirmarAquisicao}
                                className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition cursor-pointer"
                            >
                                Confirmar Aquisição via WhatsApp
                            </button>
                        </>
                    ) : (
                        <p className="mt-6 text-red-600 font-semibold text-center">
                            ❌ Este crédito está com todas as cotas adquiridas.
                        </p>
                    )}
                </div>
            </div>
        </NavbarLayout>
    );
}
