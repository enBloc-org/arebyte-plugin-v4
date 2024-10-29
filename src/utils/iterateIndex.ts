/**
 *
 * @param totalCount expects the length of the event array in the target object
 * @param currentIndex current_index in storage
 * @returns the next index in the array or zero if the full length of the array has been reached
 */
export default function iterateIndex(
  totalCount: number,
  currentIndex: number
): number {
  if (currentIndex === totalCount - 1 || currentIndex === totalCount)
    return 0

  return currentIndex + 1
}
