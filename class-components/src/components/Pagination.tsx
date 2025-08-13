interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, onPageChange }: PaginationProps) => (
  <div className="flex justify-center my-4 gap-2">
    <button
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
      className="px-3 py-1 bg-gray-300"
    >
      Prev
    </button>
    <span className="px-3 py-1">{currentPage}</span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      className="px-3 py-1 bg-gray-300"
    >
      Next
    </button>
  </div>
);
