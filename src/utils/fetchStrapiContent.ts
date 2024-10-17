interface FetchResult<T> {
  data: T | null
  meta: object
  error: string | null
}

export async function fetchStrapiContent<T>(
  endPoint: string,
  method: "GET" | "POST" | "PUT" = "GET",
  bearer?: string,
  body?: string
): Promise<FetchResult<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(bearer ? { Authorization: `bearer ${bearer}` } : {})
  }
  try {
    const response = await fetch(
      `${process.env.PLASMO_PUBLIC_API_URL}/${endPoint}`,
      {
        method: method,
        headers: headers,
        ...(body ? { body: body } : {})
      }
    )

    const returnedData = await response.json()

    if (returnedData.error)
      throw new Error(returnedData.error.message)

    return {
      ...returnedData,
      error: null
    }
  } catch (error) {
    return {
      data: null,
      meta: {},
      error:
        error instanceof Error
          ? error.message
          : "An unknown error occurred"
    }
  }
}
