import { describe, expect, it } from "@jest/globals"

import generatePagination from "../utils/generatePagination"

describe("generatePagination", () => {
  it("returns the correct page number", () => {
    const { pageNumber: result1 } = generatePagination(4)
    const { pageNumber: result2 } = generatePagination(8)
    const { pageNumber: result3 } = generatePagination(19)
    const { pageNumber: result4 } = generatePagination(22)

    expect(result1).toBe(1)
    expect(result2).toBe(2)
    expect(result3).toBe(3)
    expect(result4).toBe(4)
  })

  describe("returns the correct page size", () => {
    const { pageSize: result1 } = generatePagination(4)
    const { pageSize: result2 } = generatePagination(8)
    const { pageSize: result3 } = generatePagination(19)
    const { pageSize: result4 } = generatePagination(22)

    expect(result1).toBe(5)
    expect(result2).toBe(2)
    expect(result3).toBe(6)
    expect(result4).toBe(2)
  })

  describe("returns a full page if the given number is multiple of 7", () => {
    const { pageNumber: number1, pageSize: size1 } =
      generatePagination(7)
    const { pageNumber: number2, pageSize: size2 } =
      generatePagination(14)

    expect(number1).toBe(1)
    expect(size1).toBe(7)
    expect(number2).toBe(2)
    expect(size2).toBe(7)
  })

  describe("returns a page size of '1' if the given number is 0", () => {
    const { pageSize } = generatePagination(0)

    expect(pageSize).toBe(1)
  })
})
