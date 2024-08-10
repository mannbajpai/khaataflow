import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link to="/home">
          <button className="btn bg-turquoise-green hover:bg-green-200 text-white font-semibold py-2 px-4 rounded">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
