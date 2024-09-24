export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export interface ImageResponse {
  id: number
  name: string
  alternativeText: string
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail: ImageFormat
    medium: ImageFormat
    small: ImageFormat
    large: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown | null
  createdAt: string
  updatedAt: string
}
