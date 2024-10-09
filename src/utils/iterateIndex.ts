/**
 * 
 * @param givenArray full array of pop_ups in an event
 * @param currentIndex current_index in storage
 * @returns the next index in the array or zero if the full length of the array has been reached
 */
export default function iterateIndex(
  givenArray: [],
  currentIndex: number
): number {
  const fullLength = givenArray.length
  if (currentIndex >= fullLength) return 0

  return currentIndex + 1
}
