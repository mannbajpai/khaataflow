import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GroupCard = ({ group }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img
          src={`https://picsum.photos/id/2/2500/1667`}
          alt="Random group"
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{group.name}</h2>
        <p className="font-semibold text-lg">Code : {group.code}</p>
        <p>{group.description}</p>
        <div className="card-actions justify-end">
          <Link
            to={`/group/${group.id}`}
            className="btn btn-primary"
          >
            View Group
          </Link>
        </div>
      </div>
    </div>
  );
};

GroupCard.propTypes= {
    group: PropTypes.object.isRequired,
}

export default GroupCard;
