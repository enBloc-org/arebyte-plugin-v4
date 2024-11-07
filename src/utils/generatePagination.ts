export default function generatePagination(givenNumber: number) {
  const quotient = Math.floor(givenNumber / 7)
  const remainder = givenNumber - quotient * 7

  const pageNumber = givenNumber % 7 === 0 ? quotient : quotient + 1
  const pageSize = givenNumber % 7 === 0 ? 7 : remainder

  return { pageNumber, pageSize }
}
