<template>
  <div class="user-post">
    <div class="header pa-4">
      <img :src="postOwnerProfilePhoto" alt="" class="user-pic" />
      <p class="user-name mr-auto">{{ post.owner.user_name }}</p>
      <fa-icon icon="ellipsis-h"></fa-icon>
    </div>
    <div class="post-image-container" @dblclick="togglePostLike">
      <img :src="postImage" alt="" class="post-image" v-if="postImage" />
      <fa-icon
        icon="heart"
        class="heart"
        :class="{ show: showPostLikeHeart }"
      ></fa-icon>
    </div>
    <div class="post-actions pa-4">
      <div class="section-left">
        <fa-icon
          :icon="['far', 'heart']"
          class="fa-lg fa-fw mr-3 action like"
          :class="{ 'is-liked-by-user': isPostLikedByUser }"
          @click="togglePostLike"
        ></fa-icon>
        <fa-icon
          :icon="['far', 'comment']"
          class="fa-lg fa-fw mr-3 action"
        ></fa-icon>
        <fa-icon
          :icon="['far', 'paper-plane']"
          class="fa-lg fa-fw action"
        ></fa-icon>
      </div>
      <fa-icon
        :icon="['far', 'bookmark']"
        class="fa-lg fa-fw mr-3 bookmark action"
      ></fa-icon>
    </div>
    <div class="post-details px-4 py-2 mb-3">
      <p class="mb-2">
        <b>{{ post.likes }} likes</b>
      </p>
      <p class="mb-2">
        <b
          ><router-link :to="`/${post.owner.user_name}`">{{
            post.owner.user_name
          }}</router-link></b
        >
        {{ post.caption }}
      </p>

      <p class="post-comments-total mb-2" v-if="postCommentsTotal > 0">
        View all {{ postCommentsTotal }} comments
      </p>
      <p class="mb-2 post-comment" v-if="postCommentsTotal > 0">
        <a
          :href="`/${mostRecentComment.owner.user_name}`"
          class="mr-1 post-comment-username"
          >{{ mostRecentComment.owner.user_name }}</a
        >
        <span class="post-comment-text">{{ mostRecentComment.text }}</span>
      </p>

      <p class="post-created-at">
        <small>{{ postCreatedAt }}</small>
      </p>
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
</template>

<script lang="ts">
import { PostComment, Post } from '@/vendor/firebase/db/models'
import { Vue, Component, Prop } from 'vue-property-decorator'
import {
  getUserAccountFromStorage,
  getUserProfilePhotoFromStorage,
} from '@/vendor/firebase/db/utils'
import firebase from '@/vendor/firebase'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

@Component({})
export default class UserPost extends Vue {
  @Prop(Object) readonly post!: Post

  postOwnerProfilePhoto = '/user-profile-photo-placeholder.svg'
  postImage = ''
  isPostLikedByUser = false
  showPostLikeHeart = false

  newPostComment: PostComment = {
    owner: {},
    text: '',
  }
  postComments: { [key: string]: PostComment } = {}

  get mostRecentComment() {
    return Object.values(this.postComments)[0]
  }

  get postCommentsTotal() {
    return Object.keys(this.postComments).length
  }

  get postCommentsAsArray() {
    return Object.values(this.postComments)
  }

  get postCreatedAt() {
    return dayjs(this.post.created_at).fromNow()
  }

  mounted() {
    this.loadPostImages()

    this.loadPostComments()

    this.checkIfPostLikedByUser()
  }

  checkIfPostLikedByUser() {
    const currentUser = firebase.auth().currentUser
    firebase
      .database()
      .ref(`user_post_likes/${currentUser?.uid}/${this.post.id}`)
      .get()
      .then((snapshot) => {
        this.isPostLikedByUser = snapshot.exists()
      })
      .catch((error) => {
        alert('[checkIfPostLikedByUser] ' + error.message)
        console.error(error)
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
    this.newPostComment.owner = getUserAccountFromStorage()

    firebase
      .database()
      .ref(`/comments/${this.post.id}`)
      .push(this.newPostComment)
      .then((ref) => {
        alert('Comment posted successfully')
      })
      .catch((error) => {
        alert(error.message)
        console.error(error)
      })
  }

  togglePostLike() {
    const currentUser = firebase.auth().currentUser
    let promise: Promise<any>

    if (!this.isPostLikedByUser) {
      promise = firebase
        .database()
        .ref(`user_post_likes/${currentUser?.uid}`)
        .update({ [this.post.id]: true })
        .then(() => {
          // Increase post like count
          return firebase
            .database()
            .ref(`posts/${this.post.id}/likes`)
            .transaction((currentLikes) => {
              return currentLikes + 1
            })
        })

      // Show heart icon
      this.showPostLikeHeart = true
      setTimeout(() => {
        this.showPostLikeHeart = false
      }, 1000)
    } else {
      promise = firebase
        .database()
        .ref(`user_post_likes/${currentUser?.uid}/${this.post.id}`)
        .remove()
        .then(() => {
          // Reduce post like count
          return firebase
            .database()
            .ref(`posts/${this.post.id}/likes`)
            .transaction((currentLikes) => {
              return currentLikes - 1
            })
        })
    }

    promise
      .then(() => {
        alert('[togglePostLike] Success')
      })
      .catch((error) => {
        console.error(error)
        alert('[togglePostLike] ' + error.message)
      })
      .finally(() => {
        this.checkIfPostLikedByUser()
      })
  }
}
</script>

<style lang="scss" scoped>
.user-post {
  background-color: #fff;
  border: 1px solid mix(#000, $page-bg, 20%);
  border-radius: 3px;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  .user-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 2rem;
  }

  .user-name {
    font-weight: bold;
  }
}

.post-image-container {
  position: relative;
  .heart {
    position: absolute;
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    opacity: 0;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.356));
    visibility: hidden;

    &.show {
      visibility: visible;
      animation: heartShow 1.5s cubic-bezier(0.81, -0.5, 0.38, 1.6) forwards;
    }
  }

  @keyframes heartShow {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    50% {
      opacity: 0.75;
      transform: translate(-50%, -50%) scale(1);
    }
    70% {
      opacity: 0.75;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
  }
}

.post-image {
  background-color: #000;
  width: 100%;
}

.post-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .bookmark {
    justify-self: end;
  }

  .action {
    cursor: pointer;

    &.like.is-liked-by-user {
      color: red;
    }
  }
}

.post-created-at {
  text-transform: uppercase;
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

    &:disabled {
      color: gray;
      cursor: not-allowed;
    }
  }
}
</style>
