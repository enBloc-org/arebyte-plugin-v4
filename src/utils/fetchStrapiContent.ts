export async function fetchStrapiContent<T>(
  endPoint: string,
  method: "GET" | "POST" = "GET",
  bearer?: string,
  body?: string
): Promise<T> {
  try {
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
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || "Network response was not ok"
      )
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error("Error", error)
  }
}
