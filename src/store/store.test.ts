// test target

// dependencies
import { describe, expect, test } from "@jest/globals"
import { renderHook } from "@testing-library/react-hooks"

import useStore from "./store"

describe("store", () => {
  test("state is set on start up", () => {
    const { result } = renderHook(() => useStore.use.message())

    expect(result.current).toMatch("test message")
  })
})
