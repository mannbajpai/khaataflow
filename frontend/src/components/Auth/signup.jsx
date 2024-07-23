import { useState } from "react";
import { signup } from "../../services/authService";
import logo from "../../assets/logo-2.png"
const Signup = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const cred = JSON.stringify({username,email,password});
            console.log(cred);
            const response = signup(cred);
            if (response.status === 200){
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-light-gray">
            <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
                <img src={logo} className="w-24 mx-auto mb-6" alt="Logo" />
                <h2 className="text-center text-2xl font-semibold text-neutral mb-4">Signup</h2>
                <form className="">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-light-turquoise rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border border-light-turquoise rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-light-turquoise rounded mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full btn bg-turquoise-green text-base-100 p-3 rounded-xl"
                        onClick={handleSubmit}
                    >
                        Signup
                    </button>
                    {loading && <span className="mt-2 loading loading-dots loading-md text-primary"></span>}
                </form>
                <a href="/login" className="text-primary block text-center mt-2">
                    Already have an account? Login
                </a>
            </div>
        </div>
    );
};

export default Signup;
