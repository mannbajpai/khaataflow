import { useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import logo from "../../assets/logo-2.png"
const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState();
    const navigate = useNavigate();

        // Login function
        const login = async (email, password) => {
            try {
                const response = await api.post("/auth/login", { email, password });
                const token = response.data.token;
                localStorage.setItem("token", token);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                return response.data;
            } catch (error) {
                console.error("Login failed:", error);
                return false;
            }
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("inFunc");
        const res = await login(email, password);
        if (res) {
            setLoading(false);
            navigate("/");
        } else {
            setLoading(false);
            alert("Login failed. Please check your credentials.");
        }
    };
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-light-gray">
                <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
                    <img src={logo} className="w-24 mx-auto mb-6" alt="Logo" />
                    <h2 className="text-center text-2xl font-semibold text-neutral mb-4">Login</h2>
                    <form>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full p-3 border border-light-turquoise rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full p-3 border border-light-turquoise rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="w-full bg-turquoise-green hover:bg-green-300 text-base-100 p-3 rounded"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                    </form>
                    {loading && <span className="loading loading-dots loading-lg"></span>}
                    <a href="/forgot-password" className="text-primary block text-center mt-4">
                        Forgot Password?
                    </a>
                    <a href="/signup" className="text-primary block text-center mt-2">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
