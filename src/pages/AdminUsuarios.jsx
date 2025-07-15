import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarLayout from "../components/Navbar";

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "admin") {
            navigate("/"); // bloqueia acesso se não for admin
            return;
        }

        axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                setUsuarios(res.data);
            })
            .catch(err => {
                console.error("Erro ao buscar usuários:", err);
            });
    }, []);

    async function promover(email) {
        const token = localStorage.getItem("token");
        try {
            await axios.post("${import.meta.env.VITE_API_URL}/api/usuarios/promover", { email }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            alert(`Usuário ${email} promovido a admin`);
            setUsuarios((prev) =>
                prev.map((u) =>
                    u.email === email ? { ...u, role: "admin" } : u
                )
            );
        } catch (err) {
            alert("Erro ao promover usuário.");
        }
    }

    return (
        <NavbarLayout>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center select-none cursor-default">
                    👥 Gerenciamento de Usuários
                </h2>

                {usuarios.length === 0 ? (
                    <p className="text-gray-600 text-center select-none cursor-default">
                        Nenhum usuário encontrado.
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {usuarios.map((u) => (
                            <li
                                key={u.id}
                                className="flex justify-between items-center border p-4 rounded-xl bg-white shadow-md select-none cursor-default"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {u.nome} <span className="text-sm text-gray-500">({u.email})</span>
                                    </p>
                                    <p className="text-sm text-gray-600">Role: {u.role}</p>
                                </div>
                                {u.role !== "admin" && (
                                    <button
                                        onClick={() => promover(u.email)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer select-none"
                                    >
                                        Promover
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </NavbarLayout>
    );
}
