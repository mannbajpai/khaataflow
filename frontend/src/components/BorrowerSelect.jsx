import PropTypes from "prop-types"
import { useEffect, useState } from 'react';
import { getMembers } from '../services/groupService';
import { useAuth } from '../context/AuthContext';
const BorrowerSelect = ({ groupId, onSelectedBorrowersChange, expenseType}) => {
    const { user } = useAuth()
    const [members, setMembers] = useState([]);
    const [selectedBorrowers, setSelectedBorrowers] = useState([]);
    useEffect(() => {
        onSelectedBorrowersChange(selectedBorrowers);
    }, [selectedBorrowers, onSelectedBorrowersChange]);

    // Function to toggle the selection of a borrower
    const toggleBorrower = (member) => {
        setSelectedBorrowers((prevSelected) => {
            const isSelected = prevSelected.some((borrower) => borrower.borrowerId === member.id);
            let newSelection;

            if (expenseType === 'equal') {
                if (isSelected) {
                    // Remove if already selected
                    newSelection = prevSelected.filter((borrower) => borrower.borrowerId !== member.id);
                } else {
                    // Add if not selected
                    newSelection = [...prevSelected, { borrowerId: member.id }];
                }
            } else if (expenseType === 'exact' || expenseType === 'percentage') {
                if (isSelected) {
                    // Remove if already selected
                    newSelection = prevSelected.filter((borrower) => borrower.borrowerId !== member.id);
                } else {
                    // Add if not selected with default values
                    newSelection = [...prevSelected, { borrowerId: member.id, amount: 0, percentage: 0 }];
                }
            }

            return newSelection;
        });
    };

    // Function to update amount/percentage based on input
    const updateBorrowerValue = (borrowerId, value, type) => {
        setSelectedBorrowers((prevSelected) =>
            prevSelected.map((borrower) =>
                borrower.borrowerId === borrowerId ? { ...borrower, [type]: value } : borrower
            )
        );
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

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Borrowers:</label>
            <div className="dropdown w-full max-w-sm">
                <label
                    tabIndex={0}
                    className="btn bg-base-200 btn-outline btn-block"
                >
                    Select Borrowers
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-96 overflow-y-auto"
                >
                    {members.map((member) => (
                        (member.id != user.id) &&
                        <li key={member.id}>
                            <div className="form-control">
                                <label className="cursor-pointer label">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary"
                                        onChange={() => toggleBorrower(member)}
                                    />
                                    <span className="label-text">{member.username}</span>
                                </label>
                                {expenseType === 'exact' && selectedBorrowers.some((borrower) => borrower.borrowerId === member.id) && (
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={
                                            selectedBorrowers.find((borrower) => borrower.borrowerId === member.id)?.amount || ''
                                        }
                                        onChange={(e) => updateBorrowerValue(member.id, e.target.value, 'amount')}
                                        className="input input-bordered w-28"
                                    />
                                )}

                                {expenseType === 'percentage' && selectedBorrowers.some((borrower) => borrower.borrowerId === member.id) && (
                                    <input
                                        type="number"
                                        placeholder="Percentage"
                                        value={
                                            selectedBorrowers.find((borrower) => borrower.borrowerId === member.id)?.percentage || ''
                                        }
                                        onChange={(e) => updateBorrowerValue(member.id, e.target.value, 'percentage')}
                                        className="input input-bordered w-28"
                                    />
                                )}
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
    expenseType: PropTypes.string.isRequired,
}
export default BorrowerSelect