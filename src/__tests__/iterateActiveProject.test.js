import { beforeEach, describe, expect, it } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import { currentProjectQueryString } from "../queries/currentProjectQuery"
import iterateActiveProject from "../utils/iterateActiveProject"
import testData from "./test-data/current-project-test-data.json"

fetchMock.enableMocks()

describe("iterateActiveProject", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns the id for the unique content type 'current_project'", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testData))

    const result = await iterateActiveProject(1312)

    expect(fetch).toHaveBeenCalledWith(
      `undefined/api/current-project?${currentProjectQueryString}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "GET"
      }
    )
    expect(result).toBe(testData.data.id)
  })

  it("returns the id of the current active_project in case of an error fetching the unique content type current_project", async () => {
    fetchMock.mockRejectOnce({ error: "network error" })

    const result = await iterateActiveProject(269)

    expect(fetch).toHaveBeenCalled()
    expect(result).toBe(269)
  })
})
