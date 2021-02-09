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
  //   width: 300px;
  height: 300px;
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #000;
  cursor: pointer;
}
.post-image {
  width: 100%;
}
</style>