export default function generatePagination(givenNumber: number) {
  if (givenNumber === 0) return { pageNumber: 1, pageSize: 1 }

  const quotient = Math.floor(givenNumber / 7)
  const remainder = givenNumber - quotient * 7 + 1

  const pageNumber = quotient + 1
  const pageSize = remainder

  return { pageNumber, pageSize }
}
