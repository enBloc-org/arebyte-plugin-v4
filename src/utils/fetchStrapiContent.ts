interface FetchResult<T> {
  data: T | null
  meta: object
  error: string | null
}

export async function fetchStrapiContent<T>(
  endPoint: string,
  method: "GET" | "POST" = "GET",
  bearer?: string,
  body?: string
): Promise<FetchResult<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(bearer ? { Authorization: `bearer ${bearer}` } : {})
  }
  const response = await fetch(
    `${process.env.PLASMO_PUBLIC_API_URL}/${endPoint}`,
    {
      method: method,
      headers: headers,
      ...(body ? { body: body } : {})
    }
  )

  const returnedData = await response.json()

  if (!response.ok) {
    return {
      ...returnedData,
      error:
        returnedData.error?.message || "An unknown error occurred"
    }
  }

  return {
    ...returnedData,
    error: null
  }
}
