import { describe, expect, it } from "@jest/globals"

import iterateIndex from "../utils/iterateIndex"
import eventData from "./test-data/event-test-data.json"

describe("iterateIndex", () => {
  it("returns the given array incremented by one", () => {
    const totalPopups = eventData.data.pop_ups.length

    const result = iterateIndex(totalPopups, 0)
    const secondResult = iterateIndex(totalPopups, 2)

    expect(result).toBe(1)
    expect(secondResult).toBe(3)
  })

  it("returns 0 if the current index is the last in the array", () => {
    const totalPopups = eventData.data.pop_ups.length
    const currentIndex = totalPopups

    const result = iterateIndex(totalPopups, currentIndex)

    expect(result).toBe(0)
  })
})
