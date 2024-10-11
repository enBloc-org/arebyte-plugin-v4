import { describe, expect, it } from "@jest/globals"

import iterateIndex from "../utils/iterateIndex"
import eventData from "./test-data/event-test-data.json"

describe("iterateIndex", () => {
  it("returns the given array incremented by one", () => {
    const popupsArray = eventData.data.pop_ups

    const result = iterateIndex(popupsArray, 0)
    const secondResult = iterateIndex(popupsArray, 2)

    expect(result).toBe(1)
    expect(secondResult).toBe(3)
  })

  it("returns 0 if the current index is the last in the array", () => {
    const popupsArray = eventData.data.pop_ups
    const currentIndex = popupsArray.length

    const result = iterateIndex(popupsArray, currentIndex)

    expect(result).toBe(0)
  })
})
