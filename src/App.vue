<template>
  <div id="app">
    <TopNav v-if="$store.state.isTopNavShowing" />
    <router-view> </router-view>
    <div
      class="btn-upload-image"
      @click="$store.commit('toggleNewPostModal', true)"
    >
      <fa-icon :icon="['fab', 'instagram']"></fa-icon>
    </div>

    <NewPost v-if="$store.state.showNewPostModal" />

    <!-- <div class="post-overlay"> -->
    <router-view name="post-overlay"> </router-view>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav.vue'
import { Component, Vue } from 'vue-property-decorator'
import { watchForUserAccountChanges } from '@/vendor/firebase/db/utils'
import NewPost from '@/views/posts/NewPost.vue'
import UserPostFullscreen from '@/views/posts/UserPostFullScreen.vue'

@Component({
  components: { TopNav, NewPost, UserPostFullscreen },
})
export default class App extends Vue {
  mounted() {
    watchForUserAccountChanges()
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;

  &.no-overflow {
    overflow: hidden;
  }
}
.btn-upload-image {
  width: 55px;
  height: 55px;
  // box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  color: #000;
  font-size: 2.5rem;
  display: grid;
  place-items: center;
  border: 1px solid mix(#000, $page-bg, 20%);
  cursor: pointer;
}

.post-overlay {
}
</style>
