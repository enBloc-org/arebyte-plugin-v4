import { describe, expect, it } from "@jest/globals"

import determineFormat  from "~utils/popup-utils/determineFormat"

describe("determineFormat", () => {
  it("should return the video type for supported video extentions", () => {
    const result1 = determineFormat(".mp4")
    expect(result1).toEqual("video")

    const result2 = determineFormat(".mpeg")
    expect(result2).toEqual("video")
  })
  it("should return the image type for supported image extenstions", () => {
    const png = determineFormat(".png")
    expect(png).toEqual("image")

    const jpg = determineFormat(".jpg")
    expect(jpg).toEqual("image")

    const svg = determineFormat(".svg")
    expect(svg).toEqual("image")
  })
  
  it("should return unknow if the format is not supported", () => {
    const result = determineFormat(".doc")
    expect(result).toEqual(null)
  })
})
