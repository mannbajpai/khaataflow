import { useState } from "react";
import Footer from "../Footer";

const JoinGroupPage = () => {
  const [groupCode, setGroupCode] = useState("");

  const handleJoinGroup = async (e) => {
    e.preventDefault();
    return (
      <div className="text-2xl">Successfully Joined Group.</div>
    )
  };

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
          <button
            className="btn btn-primary w-full"
            onClick={handleJoinGroup}
          >
            Join Group
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JoinGroupPage;
