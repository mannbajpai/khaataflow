import PropTypes from "prop-types"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
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

    useEffect(() => {
        const fetchSplits = async (groupId) => {
            try {
                const res = await getMySplits(groupId, user.id);
                console.log(res);
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
                <h2 className="text-2xl font-bold mb-4">My Splits</h2>
                {loading ?
                    <Loader />
                    :
                    <>
                        <BorrowedSplits splits={borrowedSplits} />
                        <LendedSplits splits={lendedSplits} />
                    </>}
                <button className="btn btn-primary mt-4">Settle Split</button>
            </div>
            <Footer />
        </div>
    )
}

MySplits.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default MySplits