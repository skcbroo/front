import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                senha,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            navigate("/creditos");
        } catch (err) {
            alert("Credenciais inválidas");
        }
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white justify-center">
            {/* Lado esquerdo com logo e slogan */}
            <div className="flex-1 flex items-center justify-center p-8 select-none cursor-default">
                <div className="max-w-md">
                    <img
                        src="/logo.png"
                        alt="Logo Midlej Capital"
                        className="mx-auto h-24 mb-6"
                        draggable="false"
                    />
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        Midlej Capital
                    </h1>
                    <p className="text-lg text-blue-100 whitespace-nowrap text-center">
                        Créditos judiciais selecionados, Justiça no papel, lucro na conta
                    </p>
                </div>
            </div>

            {/* Lado direito com formulário */}
            <div className="flex-1 bg-white text-gray-800 flex items-center justify-center shadow-xl">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm space-y-4 px-8 py-10 select-none cursor-default"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                        Login
                    </h2>

                    <div>
                        <label className="block mb-1 font-medium">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text select-text"
                            placeholder="name@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text select-text"
                            placeholder="********"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2 cursor-pointer" /> Remember me
                        </label>
                        <a href="#" className="text-blue-600 hover:underline cursor-pointer">
                            Forgot password?
                        </a>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded cursor-pointer select-none focus:outline-none"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/cadastro")}
                            className="border border-blue-600 text-blue-600 w-full p-2 rounded hover:bg-blue-50 cursor-pointer select-none focus:outline-none"
                        >
                            Sign up
                        </button>
                    </div>

                    <div className="text-center text-sm mt-4 text-gray-500">
                        Follow
                        <div className="flex justify-center mt-2 space-x-4 text-blue-600">
                            <a href="#" className="cursor-pointer select-none">Facebook</a>
                            <a href="#" className="cursor-pointer select-none">Twitter</a>
                            <a href="#" className="cursor-pointer select-none">Instagram</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
