<template>
  <div class="user-posts">
    <div class="no-posts-container" v-if="userPosts.length <= 0">
      <img
        :src="require('@/assets/img/user-posts-empty.jpg')"
        alt="No user posts"
        class="no-user-posts"
      />

      <div class="no-posts-content">
        <h2 class="mb-3">Start capturing and sharing your moments.</h2>
        <p>Get the app to share your first photo or video.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class UserPosts extends Vue {
  userPosts = []
}
</script>

<style lang="scss" scoped>
.no-posts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.no-user-posts {
  width: 380px;
}
.no-posts-content {
  text-align: center;
}
</style>
