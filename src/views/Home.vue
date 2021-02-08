<template>
  <div class="home mx-auto pt-8">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Reels from '@/components/Reels.vue'
import UserPost from '@/components/UserPost.vue'
import { Post } from '@/vendor/firebase/db/models'
import firebase from '@/vendor/firebase'

@Component({
  components: { Reels, UserPost },
})
export default class Home extends Vue {
  allPosts: { [key: string]: Post } = {}

  mounted() {
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
  }
}
</script>

<style lang="scss" scoped>
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
</style>
