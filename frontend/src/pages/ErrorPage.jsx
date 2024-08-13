import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="bg-base-100">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 ">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Link to='/home' className="inline-flex text-white bg-turquoise-green hover:bg-green-200 font-medium rounded-xl text-lg px-5 py-2.5 text-center my-4">Back to Homepage</Link>
        </div>
    </div>
</section>
  );
};

export default ErrorPage;
