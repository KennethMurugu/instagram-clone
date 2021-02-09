<template>
  <div class="new-post">
    <div class="modal-body">
      <div class="modal-header mb-6">
        <h2>New Photo Post</h2>
        <div
          class="btn-close"
          @click="$store.commit('toggleNewPostModal', false)"
        >
          <fa-icon icon="times" class="fa-lg"></fa-icon>
        </div>
      </div>
      <FormulateForm v-model="newPostDetails" @submit="createNewPost">
        <img
          ref="post-img"
          src=""
          alt="Post image"
          class="post-image-preview mb-3"
          v-show="postImage"
        />
        <FormulateInput
          type="image"
          label="Select an image"
          validation="mime:image/jpeg,image/jpg,image/png"
          :uploader="postImgSelected"
          class="mb-6"
        />

        <FormulateInput
          type="textarea"
          name="caption"
          placeholder="Write a caption"
          class="mb-6"
        />
        <FormulateInput type="submit" :disabled="isWorking">
          <span v-if="!isWorking">Share</span>
          <span v-else>
            <fa-icon icon="cog" :spin="true"></fa-icon>
          </span>
        </FormulateInput>
      </FormulateForm>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'
import { Post, UserAccount } from '@/vendor/firebase/db/models'

@Component({})
export default class NewPost extends Vue {
  postImage: any = ''
  newPostDetails = {
    caption: '',
    created_at: Date.now(),
    likes: 0,
  }
  userAccount: UserAccount = this.$store.state.userAccount
  isWorking = false

  postImgSelected(file: Blob, progress: (value: number) => void) {
    progress(50)
    this.postImage = file
    console.log(this.postImage)
    //@ts-ignore
    const imgEl: Element = this.$refs['post-img']
    const reader = new FileReader()
    reader.onload = function (e) {
      //@ts-ignore
      imgEl.setAttribute('src', e.target!.result)
    }
    reader.readAsDataURL(this.postImage)
    progress(100)
  }

  createNewPost() {
    if (!this.postImage) return

    let postId = ''
    this.isWorking = true

    const post: Post = {
      id: '',
      caption: this.newPostDetails.caption,
      created_at: this.newPostDetails.created_at,
      likes: 0,
      owner: this.userAccount,
    }

    // Create post in database:posts
    firebase
      .database()
      .ref('/posts')
      .push(post)
      .then((ref) => {
        postId = ref.key!
        post.id = postId
        post.post_image = postId
        // Upload post image to storage:post_images/<post_id>
        return firebase
          .storage()
          .ref(`/post_images/${postId}`)
          .put(this.postImage)
      })
      .then((snapshot) => {
        // Update post in database with post id database:posts/<post_id> {id, post_image}
        return firebase
          .database()
          .ref(`posts/${postId}`)
          .update({ id: postId, post_image: postId })
      })
      .then(() => {
        // Add to storage:user_posts/<user_id>
        return firebase
          .database()
          .ref(`user_posts/${this.userAccount.uid}`)
          .push(post)
      })
      .then(() => {
        alert('Post created successfully')
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        this.isWorking = false
      })
  }
}
</script>

<style lang="scss" scoped>
.new-post {
  background-color: rgba(0, 0, 0, 0.664);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  z-index: 9999999;
}
.modal-body {
  padding: 1rem 1.5rem;
  background-color: #fff;
  width: 450px;
  max-height: 90vh;
  border-radius: 3px;
  overflow-y: auto;
  animation: modalBodyEnter 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
}

.modal-header {
  display: grid;
  grid-template-columns: auto 35px;
  align-items: center;

  .btn-close {
    text-align: center;
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-color: mix(#000, #fff, 10%);
      background-color: mix(#fff, $page-bg, 5%);
    }
  }
}

.post-image-preview {
  width: 100%;
}

@keyframes modalBodyEnter {
  from {
    transform: scale(1.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
