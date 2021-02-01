<template>
  <div class="user-post">
    <div class="header pa-4">
      <img :src="postOwnerProfilePhoto" alt="" class="user-pic" />
      <p class="user-name mr-auto">{{ post.owner.user_name }}</p>
      <fa-icon icon="ellipsis-h"></fa-icon>
    </div>
    <img :src="postImage" alt="" class="post-image" v-if="postImage" />
    <div class="post-actions pa-4">
      <div class="section-left">
        <fa-icon :icon="['far', 'heart']" class="fa-lg fa-fw mr-3"></fa-icon>
        <fa-icon :icon="['far', 'comment']" class="fa-lg fa-fw mr-3"></fa-icon>
        <fa-icon :icon="['far', 'paper-plane']" class="fa-lg fa-fw"></fa-icon>
      </div>
      <fa-icon
        :icon="['far', 'bookmark']"
        class="fa-lg fa-fw mr-3 bookmark"
      ></fa-icon>
    </div>
    <div class="post-details px-4 py-2 mb-3">
      <p class="mb-2"><b>527 Likes</b></p>
      <p class="mb-2">
        <b
          ><router-link :to="`/${post.owner.user_name}`">{{
            post.owner.user_name
          }}</router-link></b
        >
        {{ post.caption }}
      </p>
      <p><small>1 HOUR AGO</small></p>
    </div>

    <div class="post-footer">
      <span class="ic-smile">
        <fa-icon :icon="['far', 'smile']" class="fa-lg"></fa-icon>
      </span>
      <textarea
        rows="1"
        placeholder="Add a comment..."
        class="comment-input py-6"
      ></textarea>
      <button class="btn btn-submit-comment">Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from '@/vendor/firebase/db/models'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getUserProfilePhotoFromStorage } from '@/vendor/firebase/db/utils'
import firebase from '@/vendor/firebase'

@Component({})
export default class UserPost extends Vue {
  @Prop(Object) readonly post!: Post

  postOwnerProfilePhoto = '/user-profile-photo-placeholder.svg'
  postImage = ''

  mounted() {
    getUserProfilePhotoFromStorage(false, this.post.owner)
      .then(url => {
        this.postOwnerProfilePhoto = url
      })
      .catch(error => {
        alert(error.message)
      })

    firebase
      .storage()
      .ref(`/post_images/${this.post.post_image}`)
      .getDownloadURL()
      .then(url => {
        this.postImage = url
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
  }
}
</style>
