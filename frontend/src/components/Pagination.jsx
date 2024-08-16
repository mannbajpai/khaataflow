import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => (
  <div className="flex flex-col items-center mt-4">
    <div className="flex justify-center">
      <button
        onClick={() => onPageChange((prev) => Math.max(prev - 1, 1))}
        className={`mx-1 px-3 py-1 border rounded-xl hover:bg-base-200 ${currentPage === 1 ? "bg-gray-200" : "bg-white"}`}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`mx-1 px-3 py-1 border rounded-xl hover:bg-blue-200 ${currentPage === index + 1 ? "bg-blue-400 text-white" : "bg-white"}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange((prev) => Math.min(prev + 1, totalPages))}
        className={`mx-1 px-3 py-1 border rounded-xl hover:bg-base-300 ${currentPage === totalPages ? "bg-gray-200" : "bg-white"}`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
    <div className="text-center mt-2">
      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
    </div>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

export default Pagination;
