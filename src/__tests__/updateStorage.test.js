import { describe, expect, it } from "@jest/globals"

import updateStorage from "../utils/updateStorage"
import userData from "./test-data/user-session-test-data.json"

describe("updateStorage", () => {
  it("returns a new UserSession object updated for the provided keys", () => {
    const oldValue = userData
    const newValue = {
      current_index: 0,
      project_id: 269,
      jwt: "fake jwt"
    }
    const result = updateStorage(oldValue, newValue)

    expect(result.event_time).toBe(userData.event_time)
    expect(result.email).toBe(userData.email)
    expect(result.is_quiet).toBe(userData.is_quiet)
    expect(result.jwt).toBe("fake jwt")
    expect(result.current_index).toBe(0)
    expect(result.project_id).toBe(269)
    expect(Object.keys(result).length).toBe(
      Object.keys(userData).length
    )
  })
})
