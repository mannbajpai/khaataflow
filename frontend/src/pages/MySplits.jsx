import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getMySplits } from "../services/groupExpenseService"
import Loader from "../components/Loader"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import BorrowedSplits from "../components/BorrowedSplits"
import LendedSplits from "../components/LendedSplits"
const MySplits = () => {
    const { groupId } = useParams();
    const [borrowedSplits, setBorrowedSplits] = useState([]);
    const [lendedSplits, setLendedSplits] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSplits = async (groupId) => {
            try {
                const res = await getMySplits(groupId, user.id);
                if (res.status === 'success') {
                    setBorrowedSplits(res.data.borrowedExpenses);
                    setLendedSplits(res.data.lendedExpenses);
                }
            } catch (error) {
                alert("Error getting splits");
                setLoading(false);
                throw new Error(error.message);
            }
            setLoading(false);
        }
        fetchSplits(groupId);
    }, [groupId, user.id]);
    return (
        <div className="flex flex-col min-h-screen">
            <div className="pt-4 px-4 bg-base-100">
                <Navbar />
            </div>
            <div className="container mx-auto p-4">
                <button onClick={()=> navigate(-1)} className="btn ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
                <h2 className="text-3xl text-center font-bold mb-4">My Splits</h2>
                {loading ?
                    <Loader />
                    :
                    <>
                        <BorrowedSplits splits={borrowedSplits} />
                        <LendedSplits splits={lendedSplits} />
                    </>}
            </div>
            <Footer />
        </div>
    )
}



export default MySplits