import type { Page, PageData } from '../../types'

/**
 * Resolve page data for client usage
 */
export const resolvePageData = ({
  key,
  path,
  title,
  frontmatter,
  excerpt,
  headers,
}: Page): PageData => {
  return {
    key,
    path,
    title,
    frontmatter,
    excerpt,
    headers,
  }
}
