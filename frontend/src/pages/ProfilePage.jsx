import { useAuth } from "../context/AuthContext";
import defaultUser from "../assets/male-user-1.png"
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../services/userService";
const ProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleDeleteUser = async () => {
        try {
            await deleteUser();
            alert("Accoent Deleted");
            navigate('/');
        } catch (error) {
            alert("Account cannot be deleted");
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <div className="pt-4 px-4 bg-base-100 w-full">
                <Navbar />
            </div>
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center">
                    <img
                        src={user.profilePhoto || defaultUser}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mb-4"
                    />
                    <h2 className="text-xl font-semibold">{user.username}</h2>
                    <p className="text-gray-500">{user.name}</p>
                </div>
                <div className="mt-4 px-4 flex flex-row justify-between">
                    <Link to="/editProfile" className="btn bg-turquoise-green text-white hover:bg-green-300">Edit Profile</Link>
                    <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn bg-red-500 text-white hover:bg-red-300" >Delete Account</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-xl text-red-400">Warning!</h3>
                            <p className="py-4">Are you sure you want to delete your account?</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={handleDeleteUser} className="mx-2 btn bg-green-400">Confirm</button>
                                    <button className="btn bg-red-400">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
