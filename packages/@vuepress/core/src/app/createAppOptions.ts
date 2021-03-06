import { path } from '@vuepress/utils'
import type { AppConfig, AppOptions } from '../types'

/**
 * Create app options with default values
 */
export const createAppOptions = ({
  // site config
  base = '/',
  lang = 'en-US',
  title = '',
  description = '',
  head = [],
  locales = {},

  // theme config
  theme = '@vuepress/default',
  themeConfig = {},

  // directory config
  source,
  dest = path.resolve(source, '.vuepress/dist'),
  temp = path.resolve(source, '.vuepress/.temp'),
  cache = path.resolve(source, '.vuepress/.cache'),
  public: publicDir = path.resolve(source, '.vuepress/public'),

  // development config
  host = '0.0.0.0',
  port = 8080,
  debug = false,
  open = false,
  evergreen = false,
  templateDev = path.normalize(
    require.resolve('@vuepress/client/templates/index.dev.html')
  ),
  templateSSR = path.normalize(
    require.resolve('@vuepress/client/templates/index.ssr.html')
  ),
  shouldPreload = true,
  shouldPrefetch = false,

  // markdown config
  markdown = {},

  // plugins config
  plugins = [],

  // pages config
  pagePatterns = ['**/*.md', '!.vuepress', '!node_modules'],
}: AppConfig): AppOptions => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  theme,
  themeConfig,
  source,
  dest,
  temp,
  cache,
  public: publicDir,
  debug,
  host,
  port,
  open,
  evergreen,
  templateDev,
  templateSSR,
  shouldPreload,
  shouldPrefetch,
  markdown,
  plugins,
  pagePatterns,
})
