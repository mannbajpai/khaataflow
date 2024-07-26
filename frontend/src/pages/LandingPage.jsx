import { Link } from "react-router-dom"
import logo from '../assets/logo-1.png'
import Footer from "../components/Footer";
const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <nav className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <img src={logo} alt="KhaataFlow Logo" className="w-44 h-auto" />
                    <div>
                        <Link
                            to="/login"
                            className="btn btn-outline text-white text-lg mr-2 bg-turquoise-green"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="btn text-white text-lg bg-turquoise-green"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex-grow flex items-center justify-center">
                <div className="text-center px-6 py-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Welcome to KhaataFlow
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Simplify your life by managing your expenses and income effortlessly
                        with KhaataFlow. Track your spending, create budgets, and gain
                        insights into your financial habits.
                    </p>
                    <p className="text-md text-gray-500 mb-6">
                        Managing your expenses and income is crucial for achieving financial
                        stability and growth. Whether you`@apos`re saving for a big purchase or
                        simply want to keep track of where your money goes, KhaataFlow is
                        here to help!
                    </p>
                    <Link
                        to="/signup"
                        className="btn btn-lg btn-primary bg-turquoise-green"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
