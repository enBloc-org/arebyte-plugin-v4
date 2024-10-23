import { describe, expect, it } from "@jest/globals"

import parseWindowSize from "~utils/popup-utils/parseWindowSize"

describe("parseWindoSize", () => {
  const SCREEN_WIDTH = 1920
  it("should return a width and height for small (.3 ratio) value in a 16/9 aspect ratio", () => {
    const smallResult = parseWindowSize("small", SCREEN_WIDTH)
    expect(smallResult).toEqual({ width: 576, height: 324 })
  })

  it("should return a width and height for mediun (.5 ratio) with default ratio", () => {
    const mediumResult = parseWindowSize("medium", SCREEN_WIDTH)
    expect(mediumResult).toEqual({ width: 960, height: 540 })
  })

  it("should return a width and height for large (.75 ratio) with default ratio", () => {
    const largeResult = parseWindowSize("large", SCREEN_WIDTH)
    expect(largeResult).toEqual({ width: 1440, height: 810 })
  })

  it("should return a costume aspect ratio", () => {
    const customResult = parseWindowSize("small", SCREEN_WIDTH, 4 / 3)
    expect(customResult).toEqual({ width: 576, height: 432 })
  })

  it("should return the default value if values are not valid", () => {
    const invalidResult = parseWindowSize("invalid", SCREEN_WIDTH)
    expect(invalidResult).toEqual({ width: 600, height: 337 })
  })
})
