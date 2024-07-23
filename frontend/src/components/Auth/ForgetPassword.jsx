import { useState } from "react";
import Footer from "../Footer";
import FormInput from "../FormInput";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle forgot password logic here
        console.log("Forgot password for:", { email });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-xs">
                    <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    >
                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                            <button
                                className="btn bg-turquoise-green hover:bg-green-300 text-white font-bold "
                                type="submit"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="btn btn-error text-white font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPasswordPage;
