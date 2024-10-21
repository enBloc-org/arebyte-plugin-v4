import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import handler from "../background/messages/fetchProjectDetailsById"
import * as testData from "./test-data/current-project-test-data.json"

fetchMock.enableMocks()

const dataWithError = {
  data: {
    ...testData
  },
  error: null
}

describe("fetchProjectDetailsById", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns a project object to the front from our api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(dataWithError))

    const req = {
      name: "fetchProjectDetailsById",
      body: {
        id: 1
      }
    }

    const res = {
      send: jest.fn()
    }

    await handler(req, res)

    expect(fetch).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalledWith(
      JSON.parse(JSON.stringify(dataWithError))
    )
  })
})
