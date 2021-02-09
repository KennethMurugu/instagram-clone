<template>
  <div class="loading-overlay pa-3" v-if="isLoading">
    <fa-icon icon="spinner" :spin="true" class="fa-2x"></fa-icon>
  </div>
  <div class="user-posts" v-else>
    <div class="no-posts-container" v-if="userPostsAsArray.length <= 0">
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

    <div class="posts-list" v-else>
      <UserPostImageOnly
        v-for="(post, index) in userPostsAsArray"
        :post="post"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Post, UserAccount } from '@/vendor/firebase/db/models'
import { Component, Vue } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'
import UserPostImageOnly from '@/components/UserPostImageOnly.vue'

@Component({
  components: { UserPostImageOnly },
})
export default class UserPosts extends Vue {
  isLoading = true
  userPosts: { [key: string]: Post } = {}
  userAccount: UserAccount = this.$store.state.userAccount

  mounted() {
    this.getUserPosts()
  }

  get userPostsAsArray() {
    return Object.values(this.userPosts)
  }

  getUserPosts() {
    firebase
      .database()
      .ref(`user_posts/${this.userAccount.uid}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // @ts-ignore
          this.userPosts = snapshot.toJSON()
        }
      })
      .catch((error) => {
        console.error(error)
        alert('[getUserPosts] ' + error.message)
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  userPostClicked(post_id) {
    // View post
    this.$router.push(`p/${post_id}`)
  }
}
</script>

<style lang="scss" scoped>
.loading-overlay {
  text-align: center;
}
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

.posts-list {
  display: grid;
  grid-template-columns: repeat(3, 300px);
  // grid-template-rows: repeat(auto-fit, 300px);
  gap: 1rem;
}
</style>
