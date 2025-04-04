interface IPagination {
    itemsPerPage: number;
    totalItems: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

export const Pagination = ({
  itemsPerPage,
  totalItems,
  setCurrentPage,
  currentPage,
}: IPagination) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a href="!#" onClick={(e) => paginate(number, e)}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
