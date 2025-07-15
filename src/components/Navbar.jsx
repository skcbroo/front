import { Link } from "react-router-dom";

export default function NavbarLayout({ children }) {
    const role = localStorage.getItem("role");

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            {/* Navbar */}
            <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md px-6 py-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                    <img
                        src="/logo3.png"
                        alt="Logo Midlej Capital"
                        className="h-10"
                        draggable="false"
                    />
                    <span className="text-xl font-bold cursor-default select-none">
                        Midlej Capital
                    </span>
                </div>

                {/* Menu */}
                <div className="flex gap-4 text-sm">
                    <Link to="/creditos" className="hover:underline cursor-pointer select-none">
                        Créditos
                    </Link>

                    {role === "admin" && (
                        <>
                            <Link to="/admin/dashboard" className="hover:underline cursor-pointer select-none">
                                Dashboard
                            </Link>
                            <Link to="/admin/creditos" className="hover:underline cursor-pointer select-none">
                                Gerenciar Créditos
                            </Link>
                            <Link to="/admin/usuarios" className="hover:underline cursor-pointer select-none">
                                Usuários
                            </Link>
                        </>
                    )}

                    <Link to="/" className="hover:underline cursor-pointer select-none">
                        Sair
                    </Link>
                </div>
            </nav>

            {/* Conteúdo da página */}
            <div className="bg-white text-gray-800 p-10 min-h-[calc(100vh-80px)]">
                {children}
            </div>
        </div>
    );
}
