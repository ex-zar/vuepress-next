import type { Application } from 'express'
import type { loader, Configuration as WebpackConfiguration } from 'webpack'
import type * as WebpackChainConfig from 'webpack-chain'
import type * as WebpackDevServer from 'webpack-dev-server'

export type { WebpackConfiguration, WebpackChainConfig, WebpackDevServer }

/**
 * Options for bundler-webpack
 */
export interface WebpackBundlerOptions {
  /**
   * use webpack-merge to set webpack config
   */
  configureWebpack?: (
    config: WebpackConfiguration,
    isServer: boolean,
    isBuild: boolean
  ) => WebpackConfiguration

  /**
   * use webpack-chain to set webpack config
   */
  chainWebpack?: (
    config: WebpackChainConfig,
    isServer: boolean,
    isBuild: boolean
  ) => void

  /**
   * hook that to be called in `devServer.before`
   */
  beforeDevServer?: (expressApp: Application, server: WebpackDevServer) => void

  /**
   * hook that to be called in `devServer.after`
   */
  afterDevServer?: (expressApp: Application, server: WebpackDevServer) => void

  /**
   * postcss-loader options
   */
  postcss?: PostcssLoaderOptions

  /**
   * stylus-loader options
   */
  stylus?: StylusLoaderOptions

  /**
   * sass-loader options for scss files
   */
  scss?: SassLoaderOptions

  /**
   * sass-loader options for sass files
   */
  sass?: SassLoaderOptions

  /**
   * less-loader options
   */
  less?: LessLoaderOptions
}

/**
 * Common options for some webpack loaders
 */
export interface LoaderOptions {
  sourceMap?: boolean
  webpackImporter?: boolean
  additionalData?:
    | string
    | ((content: string, loaderContext: loader.LoaderContext) => string)
}

/**
 * Common type for style pre-processor options
 */
export type StylePreprocessorOptions<
  T extends Record<string, any> = Record<string, any>
> = T | ((loaderContext: loader.LoaderContext) => TextDecodeOptions)

/**
 * Options for postcss-loader
 *
 * @see https://github.com/webpack-contrib/postcss-loader#options
 */
export interface PostcssLoaderOptions extends Pick<LoaderOptions, 'sourceMap'> {
  execute?: boolean
  postcssOptions?: StylePreprocessorOptions
}

/**
 * Options for stylus-loader
 *
 * @see https://github.com/webpack-contrib/stylus-loader#options
 */
export interface StylusLoaderOptions extends LoaderOptions {
  stylusOptions?: StylePreprocessorOptions
}

/**
 * Options for sass-loader
 *
 * @see https://github.com/webpack-contrib/sass-loader#options
 */
export interface SassLoaderOptions extends LoaderOptions {
  implementation?: any
  sassOptions?: StylePreprocessorOptions
}

/**
 * Options for less-loader
 *
 * @see https://github.com/webpack-contrib/less-loader#options
 */
export interface LessLoaderOptions extends LoaderOptions {
  lessOptions?: StylePreprocessorOptions
}
