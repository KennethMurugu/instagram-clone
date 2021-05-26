<template>
  <div class="loading-overlay pa-3" v-if="isLoading">
    <fa-icon icon="spinner" :spin="true" class="fa-2x"></fa-icon>
  </div>
  <div class="user-posts" v-else>
    <div class="no-posts-container" v-if="userPostsAsArray.length <= 0">
      <img
        :src="require('@/assets/img/user-posts-empty.jpg')"
        alt="No user posts"
        class="img-no-user-posts"
      />

      <div class="no-posts-content pa-3">
        <h2 class="mb-3">Start capturing and sharing your moments.</h2>
        <p>Get the app to share your first photo or video.</p>
      </div>
    </div>

    <div class="posts-list" v-else>
      <UserPostImageOnly
        v-for="(post, index) in userPostsAsArray"
        :key="index"
        :post="post"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Post, UserAccount } from '@/vendor/firebase/db/models'
import { Component, Vue, Watch } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'
import UserPostImageOnly from '@/components/UserPostImageOnly.vue'

@Component({
  components: { UserPostImageOnly },
})
export default class UserPosts extends Vue {
  isLoading = true
  userPosts: { [key: string]: Post } = {}

  get userPostsAsArray() {
    return Object.values(this.userPosts)
  }

  get userAccount(): UserAccount {
    return this.$store.state.userAccount
  }

  @Watch('userAccount')
  onChildChanged(val: string, oldVal: string) {
    this.getUserPosts()
  }

  mounted() {
    this.getUserPosts()
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

  userPostClicked(post_id: string) {
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
.img-no-user-posts {
  width: 90%;
  max-width: 380px;
}
.no-posts-content {
  text-align: center;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(3, 32%);
  gap: 2%;
}

@media screen and (max-width: 768px) {
  .no-posts-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
  }
  .img-no-user-posts {
    margin: 1rem auto;
  }
}

@media screen and (max-width: 700px) {
  .posts-list {
    grid-template-columns: repeat(3, 33%);
    gap: 0.5%;
  }
}
</style>
