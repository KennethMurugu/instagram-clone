<template>
  <div id="app">
    <TopNav />
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav.vue'
import firebase from '@/vendor/firebase'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { TopNav },
})
export default class App extends Vue {
  currentUser() {
    return firebase.auth().currentUser
  }
}
</script>

<style lang="scss" scoped>
</style>
