<template>
  <router-link
    tag="div"
    class="user-post-image-only"
    :style="`background-image: url(${postImage})`"
    :to="`p/${post.id}`"
    append
  >
    <!-- <img :src="postImage" alt="" class="post-image" /> -->
  </router-link>
</template>

<script lang="ts">
import { Post } from '@/vendor/firebase/db/models'
import { Vue, Component, Prop } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'

@Component({})
export default class UserPostImageOnly extends Vue {
  @Prop(Object) readonly post!: Post

  postImage = ''

  mounted() {
    this.getPostImage()
  }

  getPostImage() {
    firebase
      .storage()
      .ref(`/post_images/${this.post.post_image}`)
      .getDownloadURL()
      .then((url) => {
        this.postImage = url
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.user-post-image-only {
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #000;

  cursor: pointer;
}
.post-image {
  width: 100%;
}

@media screen and (max-width: 768px) {
  .user-post-image-only {
    height: 250px;
  }
}

@media screen and (max-width: 700px) {
  .user-post-image-only {
    height: 200px;
  }
}

@media screen and (max-width: 500px) {
  .user-post-image-only {
    height: 150px;
  }
}
</style>