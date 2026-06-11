<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
    
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </RouterLink>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <div v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"
        class="search-box-block">
        <SearchBox  />
      </div>
      <NavLinks class="can-hide" />
      <ThemeSwitch />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'
import ThemeSwitch from './ThemeSwitch.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
    ThemeSwitch
  },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  // line-height $navbarHeight - 1.4rem
  display flex
  align-items center
  justify-content flex-start
  gap: 8px


  a, span, img
    display inline-block

  .sidebar-button
    position relative
    top auto
    left auto

  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    // margin-right 0.8rem
    vertical-align top
    // .navbar .logo {
    height 2.4rem
// }

  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative

  .links
    gap:10px
    justify-content:center
    align-items:center
    box-sizing border-box
    background-color transparent
    white-space nowrap
    font-size 0.9rem
    display flex
    margin-inline-start auto

  .search-box-block
    position relative
    min-height 2em

    .search-box
      position absolute
      right 0
      top 50%
      margin-top -1.1em

@media (max-width: $MQMobile)
  .navbar
    // padding-left 4rem

    padding-left 1em
    padding-right 1em

    .logo
      height 1.5em

    .can-hide
      display none
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .search-box input 
      left auto
</style>
