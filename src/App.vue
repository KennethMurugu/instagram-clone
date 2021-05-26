<template>
  <div id="app">
    <!-- <transition name="system-notice">
      <Notice type="info" class="system-notice" :dismissable="true"
        >System Notice</Notice
      >
    </transition> -->
    <TopNav v-if="$store.state.isTopNavShowing && isUserLoggedIn" />
    <router-view> </router-view>

    <MobileNav />

    <NewPost v-if="$store.state.showNewPostModal" />

    <!-- <div class="post-overlay"> -->
    <router-view name="post-overlay"> </router-view>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav.vue'
import MobileNav from '@/components/MobileNav.vue'
import { Component, Vue } from 'vue-property-decorator'
import NewPost from '@/views/posts/NewPost.vue'
import UserPostFullscreen from '@/views/posts/UserPostFullScreen.vue'

import { UserAccount } from '@/vendor/firebase/db/models'
import { isUserLoggedIn } from '@/store/utils'

@Component({
  components: { TopNav, NewPost, UserPostFullscreen, MobileNav },
})
export default class App extends Vue {
  get userAccount(): UserAccount {
    return this.$store.state.userAccount
  }

  get isUserLoggedIn() {
    return isUserLoggedIn(this)
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;

  &.no-overflow {
    overflow: hidden;
  }
}
.system-notice {
  position: absolute;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.164);
  margin: 0 auto;
  width: 50%;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
}

.system-notice-enter,
.system-notice-leave-to {
  transform: translate(-50%, -200%);
  opacity: 0;
}
.system-notice-enter-to,
.system-notice-leave {
  transform: translateY(-50%, 0%);
  opacity: 1;
}
.system-notice-enter-active,
.system-notice-leave-active {
  transition: 0.2s ease;
}
</style>
