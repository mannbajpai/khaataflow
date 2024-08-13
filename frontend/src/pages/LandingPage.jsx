import { Link } from "react-router-dom";
import logo from "../assets/logo-1.png";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            <nav className="bg-gradient-to-r from-turquoise-green to-green-100 shadow-lg">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    <img src={logo} alt="KhaataFlow Logo" className="w-36" />
                    <div>
                        <Link
                            to="/login"
                            className="btn btn-outline btn-md md:btn-md text-lg mr-2 bg-turquoise-green text-white hover:text-turquoise-green hover:bg-white"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="btn btn-md md:btn-md text-lg bg-turquoise-green text-white hover:bg-green-200"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-white to-green-50">
                <div className="text-center px-6 py-12 md:py-24">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Welcome to KhaataFlow
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
                        Simplify your life by managing your expenses and income effortlessly with KhaataFlow. Track your spending, create budgets, and gain insights into your financial habits.
                    </p>
                    <p className="text-md text-gray-500 mb-8 max-w-xl mx-auto">
                        Managing your finances is crucial for achieving stability and growth. Whether you’re saving for a big purchase or simply want to keep track of your money, KhaataFlow is here to help!
                    </p>
                    <Link
                        to="/signup"
                        className="btn btn-lg bg-turquoise-green text-white hover:bg-green-200 shadow-lg transition-transform transform hover:scale-105"
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
