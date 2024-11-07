export default function generatePagination(givenNumber: number) {
  if (givenNumber === 0) return { pageNumber: 1, pageSize: 1 }

  const quotient = Math.floor(givenNumber / 7)
  const remainder = givenNumber - quotient * 7

  const pageNumber = givenNumber % 7 === 0 ? quotient : quotient + 1
  const pageSize = givenNumber % 7 === 0 ? 7 : remainder

  return { pageNumber, pageSize }
}
