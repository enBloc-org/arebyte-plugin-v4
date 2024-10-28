export default function PaginationNav({
  pageNumber,
  pageCount,
  incrementPage,
  decrementPage
}: {
  pageNumber: number
  pageCount: number
  incrementPage: () => void
  decrementPage: () => void
}) {
  return (
    <div>
      <button
        className="button--secondary"
        onClick={decrementPage}
        disabled={pageNumber === 1}
      >
        previous
      </button>
      <p className="bold">{`${pageNumber} of ${pageCount}`}</p>
      <button
        className="button--secondary"
        onClick={incrementPage}
        disabled={pageNumber === pageCount}
      >
        next
      </button>
    </div>
  )
}
