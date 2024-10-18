import { UserSession } from "~types/userTypes"

let changes = {}

/**
 *
 * @description recursive function that will check every value of the existing storage against the provided values and update as needed
 * @param currentValue the current state in storage
 * @param newValue any values to be changed in our stored state
 * @param index pass a value only if you intend on skipping the first 'x' number of properties in the store, this argument will automatically default to 0
 * @returns a new full UserSession object to pass into storage with the updated values
 */
export default function updateStorage(
  currentValue: UserSession,
  newValue: Partial<Omit<UserSession["user"], "audience_member">> &
    Partial<UserSession["user"]>,
  index: number = 0
) {
  if (index === Object.keys(currentValue).length) {
    return { ...currentValue, ...changes }
  }

  const currentKey = Object.keys(currentValue)[index]
  switch (true) {
    case !newValue[currentKey] &&
      typeof currentValue[currentKey] !== "object":
      changes = {
        ...changes,
        [currentKey]: currentValue[currentKey]
      }
      break
    case typeof currentValue[currentKey] === "object":
      changes = {
        ...changes,
        [currentKey]: updateStorage(
          currentValue[currentKey],
          newValue,
          0
        )
      }
      break
    case !!currentValue[currentKey] && !!newValue[currentKey]:
      changes = {
        ...changes,
        [currentKey]: newValue[currentKey]
      }
      break
    default:
      changes = {
        ...changes,
        [currentKey]: newValue[currentKey]
      }
  }

  return updateStorage(currentValue, newValue, index + 1)
}
