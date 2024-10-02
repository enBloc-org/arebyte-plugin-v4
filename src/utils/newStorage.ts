import { Storage } from "@plasmohq/storage"
import { SecureStorage } from "@plasmohq/storage/secure"

/**
 *
 * @returns storage object confirming to the current node environment. SecureStorage for "production" and Storage for "development" to avoid constraints faced in an http enviroment (localhost)
 */
export default function newStorage() {
  let storage: Storage | SecureStorage | null = null

  switch (process.env.NODE_ENV) {
    case "development":
      storage = new Storage()
      return storage as Storage
    case "production":
      storage = new SecureStorage()
      storage.setPassword("pigs")
      return storage as SecureStorage
    default:
      return
  }
}
