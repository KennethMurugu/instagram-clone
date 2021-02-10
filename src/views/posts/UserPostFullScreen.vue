<template>
  <div class="user-post-fullscreen">
    <div class="close-container-desktop mx-6 my-3">
      <fa-icon
        icon="times"
        class="fa-2x close"
        @click="$router.go(-1)"
      ></fa-icon>
    </div>
    <div class="close-container-mobile pa-3">
      <fa-icon
        icon="chevron-left"
        class="fa-2x close"
        @click="$router.go(-1)"
      ></fa-icon>
      <p><b>Photo</b></p>
      <span></span>
    </div>
    <div class="post-body mb-6">
      <div class="loading-overlay" v-if="isLoading">
        <fa-icon icon="spinner" :spin="true"></fa-icon>
      </div>

      <div
        class="post-image-container"
        :style="`background-image: url('${postImage}')`"
      >
        <!-- <img :src="postImage" :alt="post.caption" class="post-image" /> -->
      </div>

      <div class="post-content">
        <div class="header px-4 py-5">
          <img :src="postOwnerProfilePhoto" alt="" class="user-pic" />
          <p class="user-name mr-auto">{{ post.owner.user_name }}</p>
          <fa-icon icon="ellipsis-h"></fa-icon>
        </div>

        <div class="comments-list px-4 pt-3">
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

        <div class="post-footer">
          <span class="ic-smile">
            <fa-icon :icon="['far', 'smile']" class="fa-lg"></fa-icon>
          </span>
          <textarea
            rows="1"
            placeholder="Add a comment..."
            class="comment-input py-6"
            v-model="newPostComment.text"
          ></textarea>
          <button
            class="btn btn-submit-comment"
            @click="postComment"
            :disabled="!newPostComment.text"
          >
            Post
          </button>
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

  postOwnerProfilePhoto =
    process.env.BASE_URL + '/user-profile-photo-placeholder.svg'
  postImage = ''
  postComments: { [key: string]: PostComment } = {}
  newPostComment: PostComment = {
    owner: {},
    text: '',
    created_at: Date.now(),
  }

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
    this.isLoading = true
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

  postComment() {
    this.newPostComment.owner = this.$store.state.userAccount

    firebase
      .database()
      .ref(`/comments/${this.post.id}`)
      .push(this.newPostComment)
      .then((ref) => {
        alert('Comment posted successfully')
        this.loadPost()
      })
      .catch((error) => {
        alert(error.message)
        console.error(error)
      })
  }
}
</script>

<style lang="scss" scoped>
$post-body-height: 435px;
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

.close-container-desktop {
  // height: 80px;
  color: #fff;
  text-align: right;
  .close {
    cursor: pointer;
  }
}

.close-container-mobile {
  display: none;
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
  z-index: 2;
}
.post-body {
  position: relative;
  background: #fff;
  width: $max-content-width;
  margin-left: auto;
  margin-right: auto;
  height: 435px;
  display: grid;
  grid-template-columns: 614px ($max-content-width - 614px);
}

.post-image-container {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 435px;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .post-image {
    width: 100%;
  }
}

.post-content {
  $header-height: 65px;
  $footer-height: 60px;
  $comments-list-height: $post-body-height - ($header-height + $footer-height);
  display: grid;
  grid-template-rows: $header-height $comments-list-height $footer-height;
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
  overflow: auto;
}

.post-footer {
  display: flex;
  border-top: 1px solid mix(#000, $page-bg, 15%);
  position: relative;

  .ic-smile {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
  }

  textarea {
    width: calc(100% - 60px);
    border: none;
    resize: none;
    padding-left: 4rem !important;
    font-family: $main-font;
    background-color: transparent;

    &:focus {
      outline: none;
    }
  }

  .btn-submit-comment {
    width: 60px;
    align-self: center;
    background-color: transparent;
    color: $btn-bg;
    font-weight: bold;

    &:disabled {
      color: gray;
      cursor: not-allowed;
    }
  }
}

@media screen and (max-width: $max-content-width) {
  .user-post-fullscreen {
    background-color: #fff;
  }
  .post-body {
    grid-template-columns: auto;
    height: auto;
    margin: 0;
    width: 100%;
  }
  .close-container-desktop {
    display: none;
  }

  .close-container-mobile {
    display: block;
    color: #000;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>