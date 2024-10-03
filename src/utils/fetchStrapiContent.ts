export async function fetchStrapiContent<T>(
  endPoint: string,
  method: "GET" | "POST" = "GET",
  bearer?: string,
  body?: string
): Promise<T> {
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
  return returnedData as T
}
