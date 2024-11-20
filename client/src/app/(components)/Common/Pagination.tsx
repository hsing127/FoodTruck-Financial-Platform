import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void; // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {/* Create buttons for each page number */}
      {Array.from({ length: totalPages }, (_, num) => (
        <button
          key={num + 1} // Assign a unique key to each button
          onClick={() => paginate(num + 1)} // Change page on button click
          className={`px-3 py-2 mx-1 rounded-md ${
            currentPage === num + 1
              ? "bg-[#8B5CF6] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {num + 1} {/* Display the page number */}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
