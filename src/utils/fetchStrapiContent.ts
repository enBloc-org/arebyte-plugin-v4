export async function fetchStrapiContent<T>(
  endPoint: string
): Promise<T> {
  try {
    const res = await fetch(
      `${process.env.PLASMO_PUBLIC_API_URL}/${endPoint}`
    )
    const data = await res.json()
    if (!data) throw new Error("Problem fetching data")
    return data as T
  } catch (error) {
    console.error(error)
  }
}
