import { UserSession } from "~types/userTypes"

/**
 *
 * @description recursive function that will check every value of the existing storage against the provided values and update as needed
 * @param currentValue the current state in storage
 * @param newValue any values to be changed in our stored state
 * @param index do not pass anything, it will automatically default to 0
 * @param changes do not pass anything, it will default to an empty object
 * @returns a new full UserSession object to pass into storage with the updated values
 */
export default function updateStorage(
  currentValue: UserSession,
  newValue: Partial<Omit<UserSession["user"], "audience_member">> &
    Partial<UserSession["user"]["audience_member"]>,
  index: number = 0,
  changes = {}
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
          0,
          {}
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

  return updateStorage(currentValue, newValue, index + 1, changes)
}
