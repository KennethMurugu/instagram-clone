<template>
  <div class="home">
    <TopNav />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopNav from '@/components/TopNav.vue'
import firebase from '@/vendor/firebase'

@Component({
  components: { TopNav },
})
export default class Home extends Vue {
  currentUser() {
    return firebase.auth().currentUser
  }
}
</script>


<style lang="scss" scoped>
</style>
