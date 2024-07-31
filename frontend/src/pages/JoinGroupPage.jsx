import { useState } from "react";
import Footer from "../components/Footer";
import { joinGroup } from "../services/groupService";
const JoinGroupPage = () => {
  const [groupCode, setGroupCode] = useState("");

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    try {
      const res = await joinGroup(groupCode);
      if (res.status === "success") {
        alert('Group Joined Successfully');
      }
    } catch (error) {
      alert("Error joining group");
      throw new Error(error.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen flex flex-col">
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

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinGroupPage;
