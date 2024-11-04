import { Storage } from "@plasmohq/storage"

/**
 *
 * @returns instance of Storage as a singleton pattern
 */
export default function newStorage() {
  let storage: Storage | null = null

  if (!storage) {
    storage = new Storage()
    return storage
  } else {
    return storage
  }
}
