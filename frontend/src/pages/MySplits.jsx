import PropTypes from "prop-types"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { getMySplits } from "../services/groupExpenseService"
import Loader from "../components/Loader"
import { useParams } from "react-router-dom"
const MySplits = () => {
    const {groupId} = useParams();
    const [splits, setSplits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSplits = async (groupId) => {
            const res = await getMySplits(groupId);
            console.log(res);
            if (res.status === 'success') {
                setSplits(res.data.splits);
            }
            setLoading(false);
        }
        fetchSplits(groupId);
    }, [groupId]);
    return (
        <div className="flex flex-col min-h-screen">
            <div className="pt-4 px-4 bg-base-100">
                <Navbar />
            </div>
            <div className="text-3xl">My Splits
                {loading ?
                    <Loader /> :
                    <div>
                        {splits.map((split) => (
                            <div className="bg-red-300 text-xl" key={split.id}>
                                {split.amount}
                            </div>
                        ))}
                    </div>
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