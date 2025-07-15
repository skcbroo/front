import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleCadastro(e) {
        e.preventDefault();
        try {
            await axios.post("${import.meta.env.VITE_API_URL}/api/auth/register", {
                nome,
                email,
                senha,
            });
            navigate("/"); // Redireciona pro login após sucesso
        } catch (err) {
            setErro("Erro ao cadastrar. E-mail já existe?");
        }
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-gray-800">
                    <div className="flex justify-center mb-6">
                        <img src="/logo2.png" alt="Logo Midlej" className="h-12" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Criar Conta</h2>
                    {erro && <p className="text-red-600 mb-2 text-sm text-center">{erro}</p>}
                    <form onSubmit={handleCadastro} className="space-y-4">
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                        >
                            Criar Conta
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Já possui conta?{" "}
                            <Link to="/" className="text-blue-600 hover:underline">
                                Entrar
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
