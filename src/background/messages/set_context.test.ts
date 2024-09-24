import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import handler from "./set_context"

fetchMock.enableMocks()

describe("handler", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("should fetch a cat fact and send it in the response", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        fact: "test message"
      })
    )

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req = {} as any

    const res = {
      send: jest.fn()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any

    await handler(req, res)

    expect(fetch).toHaveBeenCalledWith("https://catfact.ninja/fact")

    expect(res.send).toHaveBeenCalledWith({
      message: "test message"
    })
  })
})
