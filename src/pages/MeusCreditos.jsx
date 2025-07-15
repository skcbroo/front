import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MeusCreditos() {
    const [creditos, setCreditos] = useState([]);

    useEffect(() => {
       fetch(`${import.meta.env.VITE_API_URL}/api/creditos/adquiridos`)
            .then(res => res.json())
            .then(setCreditos);
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Meus Créditos</h1>
            <ul className="space-y-4">
                {creditos.map(credito => (
                    <li key={credito.id} className="border p-4 rounded bg-white text-black">
                        <p><strong>Processo:</strong> {credito.numeroProcesso}</p>
                        <p><strong>Valor:</strong> {credito.valorCredito.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        <Link
                            to={`/creditos/${credito.id}`}
                            className="inline-block mt-2 text-blue-600 hover:underline"
                        >
                            Ver detalhes
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}