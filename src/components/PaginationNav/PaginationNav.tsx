import type { Dispatch, SetStateAction } from "react"

import "./PaginationNav.css"

export default function PaginationNav({
  pageNumber,
  pageCount,
  setterFunction
}: {
  pageNumber: number
  pageCount: number
  setterFunction: Dispatch<SetStateAction<number>>
}) {
  const navigateToNext = () => {
    setterFunction(pageNumber + 1)
  }

  const navigateToPrevious = () => {
    setterFunction(pageNumber - 1)
  }

  return (
    <div className="pagination-nav">
      <button
        className="button--secondary"
        onClick={navigateToPrevious}
        disabled={pageNumber === 1}
      >
        previous
      </button>
      <p className="bold">{`${pageNumber} of ${pageCount}`}</p>
      <button
        className="button--secondary"
        onClick={navigateToNext}
        disabled={pageNumber === pageCount}
      >
        next
      </button>
    </div>
  )
}
