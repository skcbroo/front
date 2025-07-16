import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavbarLayout from "../components/Navbar";

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

  if (!credito) {
    return (
      <NavbarLayout>
        <p className="text-center mt-10 text-white select-none cursor-default">Carregando...</p>
      </NavbarLayout>
    );
  }

  const desagio = 1-(credito.preco / credito.valor);
  const totalCotas = credito.quantidadeCotas || 0;
  const cotasAdquiridas = credito.cotasAdquiridas ?? 0;
  const cotasDisponiveis = totalCotas - cotasAdquiridas;
  const precoPorCota = credito.preco / totalCotas;
  const valorTotal = quantidadeSelecionada * precoPorCota;

  const confirmarAquisicao = () => {
    if (cotasDisponiveis <= 0) {
      alert("Não há cotas disponíveis para este crédito.");
      return;
    }

    const numeroEmpresa = "5561996204646";
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
    <div className="flex justify-center items-center min-h-[80vh] px-1 sm:px-4">
        <div className="bg-white text-black p-8 rounded-2xl shadow-xl w-full max-w-2xl select-none cursor-default space-y-4">
            <h1 className="text-2xl font-bold text-center text-blue-800">Detalhes do Crédito</h1>

            {/* Processo + Valores + Descrição */}
            <div className="space-y-1">
                <p className="mb-1">
                    <strong> Processo:</strong> {credito.numeroProcesso || '—'}
                </p>

                {/* Valores agrupados corretamente */}
                <div className="space-y-1">
                    <p>
                        <strong> Expectativa de recebimento:</strong>{' '}
                        <span className="text-green-700">
                            {credito.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </p>
                    <p>
                        <strong> Valor de aquisição:</strong>{' '}
                        {credito.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p>
                        <strong> Deságio:</strong>{' '}
                        <span className="text-red-600 font-semibold">
                            {(desagio * 100).toFixed(2)}%
                        </span>
                    </p>
                </div>

                <hr className="my-4 border-t border-gray-300" />

                <h2 className="text-lg font-semibold text-center text-blue-800 flex items-center justify-center gap-2">
                     Descrição
                </h2>
                <p className="text-justify">{credito.descricao || '—'}</p>
            </div>

            <hr className="border-gray-300" />

            {/* Cotas */}
            <div className="space-y-1">
                <p><strong>📦 Cotas totais:</strong> {totalCotas}</p>
                <p><strong>{cotasDisponiveis > 0 ? '🟢' : '🔴'} Cotas disponíveis:</strong> {cotasDisponiveis}</p>
                <p><strong>💵 Preço por cota:</strong>{' '}
                    {precoPorCota.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
            </div>

            {/* Aquisição */}
            {cotasDisponiveis > 0 ? (
                <>
                    <hr className="border-gray-300" />
                    <div className="space-y-2">
                        <label className="font-medium block" htmlFor="qtd">
                            Quantidade de cotas a adquirir:
                        </label>
                        <input
                            id="qtd"
                            type="number"
                            min={1}
                            max={cotasDisponiveis}
                            value={quantidadeSelecionada}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-sm text-gray-800">
                            Total a pagar:{' '}
                            <strong>
                                {valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </strong>
                        </p>
                    </div>

                    <button
                        onClick={confirmarAquisicao}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition duration-150"
                    >
                        Confirmar solicitação via WhatsApp
                    </button>
                </>
            ) : (
                <p className="text-center text-red-600 font-semibold mt-4">
                    ❌ Este crédito está com todas as cotas adquiridas.
                </p>
            )}
        </div>
    </div>
</NavbarLayout>



  );
}
