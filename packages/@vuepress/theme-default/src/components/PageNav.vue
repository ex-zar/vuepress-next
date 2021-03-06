<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <p class="inner">
      <span v-if="prevNavLink" class="prev">
        ←
        <NavLink :item="prevNavLink" />
      </span>

      <span v-if="nextNavLink" class="next">
        <NavLink :item="nextNavLink" />
        →
      </span>
    </p>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { usePageFrontmatter } from '@vuepress/client'
import { isPlainObject, isString } from '@vuepress/shared'
import { useNavLink, useSidebarItems } from '../composables'
import type { NavLink as NavLinkType, ResolvedSidebarItem } from '../types'
import NavLink from './NavLink.vue'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | NavLinkType => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    return useNavLink(conf)
  }

  if (isPlainObject<NavLinkType>(conf)) {
    return conf
  }

  return false
}

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number
): null | NavLinkType => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset]
    if (!targetItem?.link) {
      return null
    }
    return targetItem as NavLinkType
  }

  for (const item of sidebarItems) {
    if (item.children) {
      const childResult = resolveFromSidebarItems(
        item.children,
        currentPath,
        offset
      )
      if (childResult) {
        return childResult
      }
    }
  }

  return null
}

export default defineComponent({
  name: 'PageNav',

  components: {
    NavLink,
  },

  setup() {
    const frontmatter = usePageFrontmatter()
    const sidebarItems = useSidebarItems()
    const route = useRoute()

    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev)
      if (prevConfig !== false) {
        return prevConfig
      }

      return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
    })

    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next)
      if (nextConfig !== false) {
        return nextConfig
      }

      return resolveFromSidebarItems(sidebarItems.value, route.path, 1)
    })

    return {
      prevNavLink,
      nextNavLink,
    }
  },
})
</script>

<style lang="stylus">
@require '../styles/config.styl'
@require '../styles/wrapper.styl'

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    float right
</style>
