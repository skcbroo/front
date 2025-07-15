import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const isLogado = localStorage.getItem("token");

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {isLogado && (
                <nav className="bg-white border-b border-gray-200 shadow px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Link to="/produtos" className="text-gray-700 hover:text-blue-600 font-semibold">Créditos</Link>
                        {role === "admin" && (
                            <>
                                <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-semibold">Dashboard</Link>
                                <Link to="/admin/creditos" className="text-gray-700 hover:text-blue-600 font-semibold">Cadastrar</Link>
                                <Link to="/admin/usuarios" className="text-gray-700 hover:text-blue-600 font-semibold">Usuários</Link>
                            </>
                        )}
                    </div>
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Sair
                    </button>
                </nav>
            )}

            <main className="max-w-6xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}
