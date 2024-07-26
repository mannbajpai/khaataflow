
import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the user when the app loads
    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // Set token in headers
                    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const response = await api.get("/user/me");
                    setUser(response.data.data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(response.data.data.user);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    // Signup function
    const signup = async (username, email, password) => {
        try {
            const response = await api.post("/auth/signup", {
                username,
                email,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setUser(response.data.data.user);
            return true;
        } catch (error) {
            console.error("Signup failed:", error);
            return false;
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        api.defaults.headers.common["Authorization"] = "";
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ logout, login, signup, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.func.isRequired,
}

export default AuthContext;
