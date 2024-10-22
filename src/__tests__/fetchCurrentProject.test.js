import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import handler from "../background/messages/fetchCurrentProject"
import * as testData from "./test-data/current-project-test-data.json"

fetchMock.enableMocks()

const dataWithError = {
  data: {
    ...testData
  },
  error: null
}

describe("fetchCurrentProject", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns a project object to the front from our api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(dataWithError))

    const req = {
      name: "fetchCurrentProject"
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
