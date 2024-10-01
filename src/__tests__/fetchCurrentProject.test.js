import { describe, expect, it, jest, beforeEach } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import * as testData from "../../test-data.json"
import handler from "../background/messages/fetchCurrentProject"

fetchMock.enableMocks()

describe("fetchCurrentProject", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns a project object to the front from our api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData))

    const req= {
      name: "fetchCurrentProject"
    }

    const res = {
      send: jest.fn()
    }

    await handler(req, res)

    expect(fetch).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalledWith(
      JSON.parse(JSON.stringify(testData))
    )
  })
})
