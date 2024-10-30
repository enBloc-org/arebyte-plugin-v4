import { BlocksContent } from "@strapi/blocks-react-renderer"

export interface Meta {
  pagination: {
    page: number
    pageCount: number
    pageSize: number
    total: number
  }
}

export interface AboutPage {
  id: number
  abstract: string
  description: BlocksContent
}
