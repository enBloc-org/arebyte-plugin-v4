import { describe, expect, it } from "@jest/globals"
import calculatePopupCoordinates from "~utils/calculatePopupCoordinates"
import testData from "./test-data/event-test-data.json"

describe("calculatePopupCoordinates", () => {
  const screenWidth = 1920
  const screenHeight = 1080

  it("should calculate coordinates for Top Left position", () => {
    const popup = testData.data.pop_ups[0] 
    const { top, left } = calculatePopupCoordinates(popup, screenHeight, screenWidth, 500, 375)
    expect(top).toBe(0)
    expect(left).toBe(0)
  })

  it("should calculate coordinates for Top Right position", () => {
    const popup = testData.data.pop_ups[1] 
    const { top, left } = calculatePopupCoordinates(popup, screenHeight, screenWidth, 500, 400) 
    expect(top).toBe(0)
    expect(left).toBe(screenWidth - 500) 
  })

  it("should calculate coordinates for Center position", () => {
    const popup = testData.data.pop_ups[2] 
    const { top, left } = calculatePopupCoordinates(popup, screenHeight, screenWidth, 1000, 750)
    expect(top).toBe((screenHeight - 750) / 2)
    expect(left).toBe((screenWidth - 1000) / 2) 
  })

  it("should calculate coordinates for Bottom Right position", () => {
    const popup = testData.data.pop_ups[3] 
    const { top, left } = calculatePopupCoordinates(popup, screenHeight, screenWidth, 500, 375)
    expect(top).toBe(screenHeight - 375) 
    expect(left).toBe(screenWidth - 500) 
  })

  it("should calculate coordinates for Bottom Left position", () => {
    const popup = testData.data.pop_ups[4] 
    const { top, left } = calculatePopupCoordinates(popup, screenHeight, screenWidth, 500, 375)
    expect(top).toBe(screenHeight - 375) 
    expect(left).toBe(0)
  })
})