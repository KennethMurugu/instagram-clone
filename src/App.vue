<template>
  <div id="app">
    <TopNav v-if="$store.state.isTopNavShowing && isUserLoggedIn" />
    <router-view> </router-view>
    <div
      class="btn-upload-image"
      @click="$store.commit('toggleNewPostModal', true)"
      v-if="isUserLoggedIn"
    >
      <fa-icon icon="camera-retro"></fa-icon>
    </div>
    <MobileNav />

    <NewPost v-if="$store.state.showNewPostModal" />

    <!-- <div class="post-overlay"> -->
    <router-view name="post-overlay"> </router-view>
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import TopNav from '@/components/TopNav.vue'
import MobileNav from '@/components/MobileNav.vue'
import { Component, Vue } from 'vue-property-decorator'
import NewPost from '@/views/posts/NewPost.vue'
import UserPostFullscreen from '@/views/posts/UserPostFullScreen.vue'
import firebase from '@/vendor/firebase'
import { UserAccount } from '@/vendor/firebase/db/models'
import { isUserLoggedIn } from '@/store/utils'

@Component({
  components: { TopNav, NewPost, UserPostFullscreen, MobileNav },
})
export default class App extends Vue {
  get userAccount(): UserAccount {
    return this.$store.state.userAccount
  }

  get isUserLoggedIn() {
    return isUserLoggedIn(this)
  }

  mounted() {
    // Set callback for auth state changes
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('The user is signed in; uid = ' + user.uid)

        firebase
          .database()
          .ref(`accounts/${user?.uid}`)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userAccount: UserAccount = snapshot.toJSON()!

              this.$store.commit('setUserAccount', userAccount)
              this.disableWatchForUserAccountChanges()
              this.watchForUserAccountChanges()
            }
          })
      } else {
        console.log('No user is signed in')
        this.disableWatchForUserAccountChanges()
        this.$store.commit('setUserAccount', {})
      }
    })

    // this.watchForUserAccountChanges()
  }

  disableWatchForUserAccountChanges() {
    firebase.database().ref(`accounts/${this.userAccount.uid}`).off('value')

    console.log(
      '[disableWatchForUserAccountChanges] Disabled callback on user account change...'
    )
  }

  watchForUserAccountChanges() {
    const uid = this.$store.state.userAccount.uid
    firebase
      .database()
      .ref(`accounts/${uid}`)
      .on('value', (snapshot) => {
        console.log(
          '[watchForUserAccountChanges] Detected change on user account...'
        )
        if (snapshot.exists()) {
          const userAccount = snapshot.toJSON()!
          this.$store.commit('setUserAccount', userAccount)
        } else {
          console.error('[watchForUserAccountChanges] Snapshot is empty')
        }
      })

    console.log('Watching for user account changes...')
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;

  &.no-overflow {
    overflow: hidden;
  }
}
.btn-upload-image {
  background-color: #fff;
  width: 55px;
  height: 55px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border-radius: 50%;
  color: #000;
  font-size: 2rem;
  display: grid;
  place-items: center;
  // border: 1px solid mix(#000, $page-bg, 20%);
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .btn-upload-image {
    display: none;
  }
}
</style>
