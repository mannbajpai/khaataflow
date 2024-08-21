import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { createGroup } from "../services/groupService";
import { useNavigate } from "react-router-dom";
import { NotifyContainer, notifyError, notifySuccess } from "../components/Notification";
import Loader from "../components/Loader";
const CreateGroupPage = () => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await createGroup({ name, description });
            if (res.status === "success") {
                notifySuccess('Group Created Successfully');
                setTimeout(() => navigate(-1), 2000)
            }
        } catch (error) {
            notifyError("Error Creating Group");
            throw new Error(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="pt-4 px-4 bg-base-100">
                <Navbar />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-6 text-center">Create a Group</h1>
                <div className="w-full max-w-sm space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="input input-bordered w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                        <button
                            className="btn bg-red-500 hover:bg-red-300"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                        <button
                            className={`btn bg-turquoise-green hover:bg-green-300 ${loading&&"btn-disabled"}`}
                            onClick={handleCreateGroup}
                        >
                            Create Group
                        </button>
                    </div>
                    <NotifyContainer />
                </div>
                {loading && <Loader/>}
            </div>
            <Footer />
        </div>
    );
};

export default CreateGroupPage;
