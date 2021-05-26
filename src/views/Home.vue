<template>
  <div class="loading-overlay pa-3" v-if="isLoading">
    <fa-icon icon="spinner" :spin="true" class="fa-3x"></fa-icon>
  </div>
  <div class="home mx-auto pt-8" v-else>
    <Reels class="mb-6" />

    <div class="no-posts-msg" v-if="Object.keys(allPosts).length <= 0">
      <h2 class="mb-6">It's so empty here...</h2>
      <p>
        You should probably
        <span
          class="link-make-new-post"
          @click="$store.state.showNewPostModal = true"
          >make a new post :-)</span
        >
      </p>
    </div>
    <template v-else>
      <UserPost
        v-for="(post, index) in allPosts"
        :key="index"
        :post="post"
        class="mb-6"
      />
    </template>

    <div
      class="btn-upload-image"
      @click="$store.commit('toggleNewPostModal', true)"
      v-if="isUserLoggedIn"
    >
      <fa-icon icon="camera-retro"></fa-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Reels from '@/components/Reels.vue'
import UserPost from '@/components/UserPost.vue'
import { Post, UserAccount } from '@/vendor/firebase/db/models'
import firebase from '@/vendor/firebase'
import { isUserLoggedIn } from '@/store/utils'

@Component({
  components: { Reels, UserPost },
})
export default class Home extends Vue {
  isLoading = true
  allPosts: { [key: string]: Post } = {}

  get userAccount(): UserAccount {
    return this.$store.state.userAccount
  }

  get isUserLoggedIn() {
    return isUserLoggedIn(this)
  }

  mounted() {
    // Check if user is logged in

    if (this.userAccount.uid == null) {
      // Not logged in
      this.$router.push('/login')
      return
    }

    // Show nav
    this.$store.commit('toggleTopNav', true)

    // Get posts
    firebase
      .database()
      .ref('/posts')
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // @ts-ignore
          this.allPosts = snapshot.toJSON()

          // console.log(snapshot.toJSON())
        }
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        this.isLoading = false
      })
  }
}
</script>

<style lang="scss" scoped>
.loading-overlay {
  text-align: center;
  height: 82vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home {
  max-width: 614px;
}

.no-posts-msg {
  text-align: center;
}
.link-make-new-post {
  color: $btn-bg;
  font-weight: bold;
  cursor: pointer;
}
.btn-upload-image {
  background-color: #fff;
  width: 55px;
  height: 55px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  color: #000;
  font-size: 2rem;
  display: grid;
  place-items: center;
  // border: 1px solid mix(#000, $page-bg, 20%);
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .btn-upload-image {
    display: none;
  }
}
</style>
