import usePokemonList from "../hooks/usePokemonList";

const Pagination: React.FC = () => {
  const { page, setPage } = usePokemonList();

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="text-lg font-semibold">Page {page}</span>
      <button
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
