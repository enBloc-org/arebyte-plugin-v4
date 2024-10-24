import { describe, expect, it } from "@jest/globals"

import parseImageSize from "~utils/popup-utils/parseImageSize"

import testData from "./test-data/event-test-data.json"

describe("parseImageSize", () => {
  it("should return the correct image size and URL when format exists", () => {
    const popup = testData.data.pop_ups[0]

    const result = parseImageSize(
      popup.popup_size,
      popup.popup_content
    )
    expect(result).toEqual({
      width: 500,
      height: 375,
      url: "/uploads/small_minimal_ritual_1_067306f271.png"
    })
  })

  it("should return the default image size and URL if format is not available", () => {
    const popup = {
      popup_size: "Large",
      popup_content: [
        {
          media: {
            formats: {},
            height: 2291,
            width: 2500,
            url: "/uploads/minimai_ritual_3_98eae96a5f.png"
          }
        }
      ]
    }

    const result = parseImageSize(
      popup.popup_size,
      popup.popup_content
    )
    expect(result).toEqual({
      width: 2500,
      height: 2291,
      url: "/uploads/minimai_ritual_3_98eae96a5f.png"
    })
  })
})
