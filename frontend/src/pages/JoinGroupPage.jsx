import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { joinGroup } from "../services/groupService";
import { useNavigate } from "react-router-dom";
import { NotifyContainer, notifyError, notifySuccess } from "../components/Notification";
import Loader from "../components/Loader";
const JoinGroupPage = () => {
  const [groupCode, setGroupCode] = useState("");
  const [loading, setLoading] = useState("");
  const navigate = useNavigate();


  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await joinGroup({code:groupCode});
      if (res.status === "success") {
        notifySuccess('Group Joined Successfully');
        setTimeout(()=>navigate(-1),2000)
      }
    } catch (error) {
      notifyError("Error joining group");
      throw new Error(error.message);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-4 px-4 bg-base-100">
        <Navbar />
      </div>
      <div className="flex-1 p-8 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Join a Group</h1>
        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="Enter Group Code"
            className="input input-bordered w-full"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              className="btn bg-red-500 hover:bg-red-300"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn bg-turquoise-green hover:bg-green-300"
              onClick={handleJoinGroup}
            >
              Join Group
            </button>
          </div>
          {loading && <Loader/>}
          <NotifyContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinGroupPage;
