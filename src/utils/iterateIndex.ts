export default function iterateIndex(
  givenArray: [],
  currentIndex: number
): number {
  const fullLength = givenArray.length
  if (currentIndex >= fullLength) return 0

  return currentIndex + 1
}
