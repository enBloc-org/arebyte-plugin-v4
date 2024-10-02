import { beforeEach, describe, expect, it, jest } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import handler from "../background/messages/triggerPopup"
import * as module from "../utils/backgroundPopCreate"
import * as testData from "./test-data/event-test-data.json"

fetchMock.enableMocks()

describe("fetchCurrentProject", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    jest.resetAllMocks()
  })

  it("returns a project object to the front from our api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData))
    const mockFunction = jest.mock(module, "default")

    const req = {
      name: "fetchCurrentProject"
    }

    const res = {
      send: jest.fn()
    }

    await handler(req, res)

    expect(fetch).toHaveBeenCalled()
    expect(mockFunction).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalledWith("sucess!")
  })
})
