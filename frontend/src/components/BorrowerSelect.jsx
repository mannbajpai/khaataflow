import PropTypes from "prop-types"
import { useEffect, useState } from 'react';
import { getMembers } from '../services/groupService';
import { useAuth } from '../context/AuthContext';
const BorrowerSelect = ({ groupId, onSelectedBorrowersChange }) => {
    const { user } = useAuth()
    const [members, setMembers] = useState([]);
    const [selectedBorrowers, setSelectedBorrowers] = useState([]);

    const toggleBorrower = (member) => {
        setSelectedBorrowers((prevSelected) => {
          const newSelection = prevSelected.some((borrower) => borrower.id === member.id)
            ? prevSelected.filter((borrower) => borrower.id !== member.id) // Remove if already selected
            : [...prevSelected, member]; // Add if not selected
          
          // Call the parent callback function to update the state
          onSelectedBorrowersChange(newSelection);
          return newSelection;
        });
      };

    useEffect(() => {
        const fetchMembers = async (groupId) => {
            const res = await getMembers(groupId);
            if (res.status === 'success') {
                setMembers(res.data.members);
            }
        }

        fetchMembers(groupId);
    }, [groupId]);

    console.log(selectedBorrowers);
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Borrowers:</label>
            <div className="dropdown">
                <label
                    tabIndex={0}
                    className="btn btn-outline btn-block"
                >
                    Select Borrowers
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto"
                >
                    {members.map((member) => (
                        (member.id != user.id) &&
                        <li key={member.id}>
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selectedBorrowers.some((borrower) => borrower.id === member.id)}
                                        onChange={() => toggleBorrower(member)}
                                    />
                                    <span className="ml-2">{member.username}</span>
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
BorrowerSelect.propTypes = {
    groupId: PropTypes.string.isRequired,
    onSelectedBorrowersChange: PropTypes.func.isRequired,
}
export default BorrowerSelect