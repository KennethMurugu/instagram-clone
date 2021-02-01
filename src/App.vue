<template>
  <div id="app">
    <TopNav v-if="$store.state.isTopNavShowing" />
    <router-view> </router-view>
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav.vue'
import firebase from '@/vendor/firebase'
import { Component, Vue } from 'vue-property-decorator'
import { UserAccount } from './vendor/firebase/db/models'
import { watchForUserAccountChanges } from '@/vendor/firebase/db/utils'

@Component({
  components: { TopNav }
})
export default class App extends Vue {
  mounted() {
    watchForUserAccountChanges()
  }
}
</script>

<style lang="scss" scoped></style>
