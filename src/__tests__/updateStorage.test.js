import { describe, expect, it } from "@jest/globals"

import updateStorage from "../utils/updateStorage"
import userData from "./test-data/user-session-test-data.json"

describe("updateStorage", () => {
  it("returns a new UserSession object updated for the provided keys", () => {
    const oldValue = userData
    const newValue = {
      current_index: 5,
      project_id: 269,
      username: "test name",
      jwt: "fake jwt"
    }
    const result = updateStorage(oldValue, newValue)

    expect(result.user.audience_member.event_time).toBe(
      userData.user.audience_member.event_time
    )
    expect(result.user.email).toBe(userData.user.email)
    expect(result.user.audience_member.is_quiet).toBe(
      userData.user.audience_member.is_quiet
    )
    expect(result.jwt).toBe("fake jwt")
    expect(result.user.username).toBe("test name")
    expect(result.user.audience_member.current_index).toBe(5)
    expect(result.user.audience_member.project_id).toBe(269)
    expect(Object.keys(result).length).toBe(
      Object.keys(userData).length
    )
  })
})
