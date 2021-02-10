<template>
  <nav class="mobile-nav">
    <router-link to="/" class="nav-link"
      ><fa-icon icon="home" class="fa-2x fa-fw"></fa-icon
    ></router-link>
    <router-link to="/" class="nav-link"
      ><fa-icon icon="search" class="fa-2x fa-fw"></fa-icon
    ></router-link>
    <router-link to="/" class="nav-link"
      ><fa-icon :icon="['far', 'plus-square']" class="fa-2x fa-fw"></fa-icon
    ></router-link>
    <router-link to="/" class="nav-link"
      ><fa-icon :icon="['far', 'heart']" class="fa-2x fa-fw"></fa-icon
    ></router-link>
    <router-link :to="`/${userAccount.user_name}`" class="nav-link"
      ><img :src="userProfileUrl" alt="" class="user-pic" width="28"
    /></router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getUserProfilePhotoFromStorage } from '@/vendor/firebase/db/utils'

@Component({})
export default class MobileNav extends Vue {
  userProfileUrl = process.env.BASE_URL + '/user-profile-photo-placeholder.svg'

  get userAccount(): UserAccount {
    return this.$store.state.userAccount
  }

  mounted() {
    getUserProfilePhotoFromStorage()
      .then((url) => {
        this.userProfileUrl = url
      })
      .catch((error) => {
        console.error(error)
        // alert('Could not get user profile photo: ' + error.message)
      })
  }
}
</script>

<style lang="scss" scoped>
.mobile-nav {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  border-top: 1px solid rgb(219, 219, 219);
  display: none;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
}

.nav-link {
  text-align: center;
  padding: 1rem;
  color: #000;
}

.user-pic {
  border-radius: 50%;
}

@media screen and (max-width: 768px) {
  .mobile-nav {
    display: grid;
  }
}
</style>