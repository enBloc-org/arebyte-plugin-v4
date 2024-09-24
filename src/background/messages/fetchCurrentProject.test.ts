import { describe, expect, it, jest } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import * as testData from "../../../test-data.json"
import handler from "./fetchCurrentProject"

fetchMock.enableMocks()

describe("fetchCurrentProject", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns a project object to the front from our api", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData))

    const req: PlasmoMessaging.Request = {
      name: "fetchCurrentProject"
    }

    const res: PlasmoMessaging.Response = {
      send: jest.fn()
    }

    await handler(req, res)

    expect(fetch).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalledWith(
      JSON.parse(JSON.stringify(testData))
    )
  })
})
