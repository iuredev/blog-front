interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({ totalPages, currentPage, setCurrentPage  } : PaginationProps) => {

  
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prevPage => prevPage + 1);
  };


  if(totalPages <= 1) {
    return null
  }

  return (
  
      <div className="flex justify-center space-x-4 mt-8 text-sm animate-fade">
        {currentPage !== 1 && <button
          onClick={handlePrev}
          className="cursor-pointer hover:text-blue-600"

        >
          Prev
        </button>}
        

        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-2 py-2 rounded ${currentPage === pageNum ? 'text-blue-500' : 'text-gray-200'} hover:text-blue-600`}
            >
              {pageNum}
            </button>
          );
        })}

        {currentPage !== totalPages && <button
          onClick={handleNext}
          className="cursor-pointer text-white rounded hover:text-blue-600"
        >
          Next
        </button>}
        
      </div>
  );
};

export default Pagination;