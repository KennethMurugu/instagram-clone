<template>
  <div class="user-post-fullscreen">
    <div class="close-container mx-6 my-3">
      <fa-icon
        icon="times"
        class="fa-2x close"
        @click="$router.go(-1)"
      ></fa-icon>
    </div>
    <div class="post-body mx-auto my-3">
      <div class="loading-overlay" v-if="isLoading">
        <fa-icon icon="spinner" :spin="true"></fa-icon>
      </div>
      <div class="post-image-container">
        <img :src="postImage" :alt="post.caption" class="post-image" />
      </div>
      <div class="post-content">
        <div class="header px-4 py-5 mb-6">
          <img :src="postOwnerProfilePhoto" alt="" class="user-pic" />
          <p class="user-name mr-auto">{{ post.owner.user_name }}</p>
          <fa-icon icon="ellipsis-h"></fa-icon>
        </div>

        <div class="comments-list px-4 mb-6">
          <div class="post-caption mb-6">
            <router-link :to="`/${post.owner.user_name}`" class="owner mb-1">{{
              post.owner.user_name
            }}</router-link>
            <span class="text"> {{ post.caption }}</span>
            <p class="created-at mt-2">
              {{ formatCreatedAt(post.created_at) }}
            </p>
          </div>

          <div
            class="comment mb-6"
            v-for="(comment, index) in postCommentsAsArray"
            :key="index"
          >
            <router-link
              :to="`/${comment.owner.user_name}`"
              class="owner mb-1"
              >{{ comment.owner.user_name }}</router-link
            >
            <span class="text"> {{ comment.text }}</span>
            <p class="created-at mt-2">
              {{ formatCreatedAt(comment.created_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'
import { Post, PostComment } from '@/vendor/firebase/db/models'
import { getUserProfilePhotoFromStorage } from '@/vendor/firebase/db/utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

@Component({})
export default class UserPostFullScreen extends Vue {
  isLoading = true
  post_id = this.$route.params.post_id
  post: Post = {
    id: this.post_id,
    owner: {},
  }

  postOwnerProfilePhoto = '/user-profile-photo-placeholder.svg'
  postImage = ''
  postComments: { [key: string]: PostComment } = {}

  get postCommentsAsArray() {
    return Object.values(this.postComments)
  }

  mounted() {
    const el = document.querySelector('body')
    el?.classList.add('no-overflow')

    this.loadPost()
  }

  beforeDestroy() {
    const el = document.querySelector('body')
    el?.classList.remove('no-overflow')
  }

  formatCreatedAt(date = 0) {
    return dayjs(date).fromNow()
  }

  loadPost() {
    firebase
      .database()
      .ref(`/posts/${this.post_id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          // @ts-ignore
          this.post = snapshot.toJSON()!

          this.loadPostImages()
          this.loadPostComments()
        }
      })
      .catch((error) => {
        console.error(error)
        alert('[loadPost] ' + error.message)
      })
      .finally(() => {
        this.isLoading = false
      })
  }

  loadPostImages() {
    getUserProfilePhotoFromStorage(false, this.post.owner)
      .then((url) => {
        this.postOwnerProfilePhoto = url
      })
      .catch((error) => {
        alert(error.message)
      })

    firebase
      .storage()
      .ref(`/post_images/${this.post.post_image}`)
      .getDownloadURL()
      .then((url) => {
        this.postImage = url
      })
  }

  loadPostComments() {
    firebase
      .database()
      .ref(`comments/${this.post.id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.postComments = snapshot.val()
        }
      })
      .catch((error) => {
        alert(error.message)
        console.error(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.user-post-fullscreen {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  overflow: auto;
}

.close-container {
  // height: 80px;
  color: #fff;
  text-align: right;
  .close {
    cursor: pointer;
  }
}

.loading-overlay {
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: mix(#000, #fff, 50%);
}
.post-body {
  position: relative;
  background: #fff;
  width: $max-content-width;
  height: 435px;
  display: grid;
  grid-template-columns: 614px ($max-content-width - 614px);
}

.post-image-container {
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .post-image {
    width: 100%;
  }
}

.created-at {
  color: mix(#000, #fff, 40%);
  font-size: 0.9rem;
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid mix(#000, #fff, 5%);
  .user-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  .user-name {
    font-weight: bold;
  }
}

.comments-list {
  height: 328px;
  overflow: auto;
}
</style>