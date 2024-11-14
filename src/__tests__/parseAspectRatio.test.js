import { describe, expect, it } from "@jest/globals"

import parseAspectRatio from "../utils/popup-utils/parseAspectRatio.ts"

describe("parseAspectRation", () => {
  it("returns a number calculated based on the aspect ratio described in the string passed in", () => {
    const squareRatio = parseAspectRatio("square (4:3)")
    const rectangularRatio = parseAspectRatio("rectangular (16:9)")

    expect(squareRatio).toBe(4 / 3)
    expect(rectangularRatio).toBe(16 / 9)
  })

  it("returns the value of 16:9 aspect ratio as a default if the passed string is invalid", () => {
    const failingRatio = parseAspectRatio("invalid string")

    expect(failingRatio).toBe(16 / 9)
  })
})
