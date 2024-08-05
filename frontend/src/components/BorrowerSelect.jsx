import PropTypes from "prop-types"
import { useEffect, useState } from 'react';
import { getMembers } from '../services/groupService';
import { useAuth } from '../context/AuthContext';
const BorrowerSelect = ({groupId}) => {
    const {user} = useAuth()
    const [members, setMembers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelect = (e) => {
        const selectedOption = e.target.value;
        if (selectedOptions.includes(selectedOption)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== selectedOption));
        } else {
            setSelectedOptions([...selectedOptions, selectedOption]);
        }
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
    <div>
                        <label className="block mb-2 font-semibold">Borrower</label>
                        <select
                            multiple
                            value={selectedOptions}
                            onChange={handleSelect}
                            name="borrowers"
                            className="input input-bordered w-full max-w-sm"
                            defaultValue="entertainment"
                        >
                            {members.map((member, key) => (
                                (member.id != user.id) && <option key={key} value={member.username}>{member.username}</option>
                            ))}
                        </select>
                    </div>
  )
}
BorrowerSelect.propTypes = {
    groupId: PropTypes.string.isRequired,
}
export default BorrowerSelect