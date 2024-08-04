import PropTypes from "prop-types"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { getMySplits } from "../services/groupExpenseService"
import Loader from "../components/Loader"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
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
            <div className="text-3xl">My Splits
                {loading ?
                    <Loader /> :
                    <>
                        <div>
                            {borrowedSplits.map((split) => (
                                <div className="bg-red-300 text-xl" key={split.id}>
                                    {split.amount}
                                </div>
                            ))}
                        </div>
                        <div>
                            {lendedSplits.map((splits)=>{
                                splits.map((split) =>(
                                    <div key={split.id}>split.amount</div>
                                )
                                )
                            })}
                        </div>
                    </>
                }
            </div>
            <Footer />
        </div>
    )
}

MySplits.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default MySplits