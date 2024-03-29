<template>
  <div class="loading-overlay pa-3" v-if="isLoading">
    <fa-icon icon="spinner" :spin="true" class="fa-3x"></fa-icon>
  </div>
  <div class="user-account pb-12" v-else>
    <div class="user-details-container pt-10">
      <img :src="userProfileUrl" alt="" class="user-pic" />

      <div class="user-details mb-12">
        <div class="header mb-7">
          <p class="user-name mr-6">{{ userAccount.user_name }}</p>
          <p class="link-edit-profile-desktop">
            <router-link to="/accounts/edit" class="link-edit-profile mr-6"
              >Edit Profile</router-link
            >
          </p>
          <fa-icon icon="ellipsis-h" class="fa-lg"></fa-icon>
        </div>

        <p class="mb-6 link-edit-profile-mobile">
          <router-link to="/accounts/edit" class="link-edit-profile mr-6"
            >Edit Profile</router-link
          >
        </p>
        <div class="desktop-stats mb-7">
          <p class="stat">
            <b class="count">{{ userPostsCount }}</b>
            &nbsp;
            <span class="name">posts</span>
          </p>
          <p class="stat">
            <b class="count">0</b>
            &nbsp;
            <span class="name">followers</span>
          </p>
          <p class="stat">
            <b class="count">0</b>
            &nbsp;
            <span class="name">following</span>
          </p>
        </div>

        <div class="personal-details">
          <p class="full-name mb-2">
            <b>{{ userAccount.full_name }}</b>
          </p>
          <p class="bio mb-2">
            {{ userAccount.bio }}
          </p>
          <p class="website">
            <a href="https://kenkim.co.ke" target="_blank">kenkim.co.ke</a>
          </p>
        </div>
      </div>
    </div>

    <div class="mobile-stats">
      <p class="stat">
        <b class="count">{{ userPostsCount }}</b>
        &nbsp;
        <span class="name">posts</span>
      </p>
      <p class="stat">
        <b class="count">0</b>
        &nbsp;
        <span class="name">followers</span>
      </p>
      <p class="stat">
        <b class="count">0</b>
        &nbsp;
        <span class="name">following</span>
      </p>
    </div>

    <div class="page-content">
      <div class="tabs mb-0">
        <router-link
          :to="`/${userAccount.user_name}`"
          class="tab"
          :class="{ selected: activeTab == 0 }"
          @click.native="activeTab = 0"
        >
          <fa-icon icon="border-all" class="fa-fw icon"></fa-icon>
          <span class="text">&nbsp;Posts</span>
        </router-link>
        <router-link
          :to="`/${userAccount.user_name}/channel`"
          class="tab"
          :class="{ selected: activeTab == 1 }"
          @click.native="activeTab = 1"
        >
          <fa-icon icon="tv" class="fa-fw icon"></fa-icon>
          <span class="text">&nbsp;IGTV</span>
        </router-link>
        <router-link
          :to="`/${userAccount.user_name}/saved`"
          class="tab"
          :class="{ selected: activeTab == 2 }"
          @click.native="activeTab = 2"
        >
          <fa-icon :icon="['far', 'bookmark']" class="fa-fw icon"></fa-icon>
          <span class="text">&nbsp;Saved</span>
        </router-link>
        <router-link
          :to="`/${userAccount.user_name}/tagged`"
          class="tab"
          :class="{ selected: activeTab == 3 }"
          @click.native="activeTab = 3"
        >
          <fa-icon icon="user-tag" class="fa-fw icon"></fa-icon>
          <span class="text">&nbsp;Tagged</span>
        </router-link>
      </div>

      <div class="content">
        <router-view></router-view>
      </div>

      <router-view name="post-overlay"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserAccount } from '@/vendor/firebase/db/models'
import { getUserProfilePhotoFromStorage } from '@/vendor/firebase/db/utils'
import firebase from '@/vendor/firebase'
import { isUserLoggedIn } from '@/store/utils'

@Component({})
export default class UserAccountBase extends Vue {
  @Prop(String) readonly user_name!: string
  currentUserName = ''

  activeTab = 0
  userProfileUrl = process.env.BASE_URL + '/user-profile-photo-placeholder.svg'
  isLoading = true
  userPostsCount = 0

  get userAccount(): UserAccount {
    return this.$store.state.userAccount
  }

  mounted() {
    this.$store.commit('toggleTopNav', true)
    if (!isUserLoggedIn(this)) {
      this.$router.push('/login')
    }

    getUserProfilePhotoFromStorage()
      .then((url) => {
        this.userProfileUrl = url
      })
      .catch((error) => {
        alert(error.message)
      })
      .finally(() => {
        this.isLoading = false
      })

    this.getUserPostsCount()
  }

  getUserPostsCount() {
    firebase
      .database()
      .ref(`user_posts/${this.userAccount.uid}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const obj = snapshot.toJSON()!
          this.userPostsCount = Object.keys(obj).length
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.loading-overlay {
  text-align: center;
  height: 82vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-details-container {
  width: $max-content-width;
  display: grid;
  grid-template-columns: 300px auto;
  margin-left: auto;
  margin-right: auto;
}
.user-pic {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  justify-self: center;
}

.user-name {
  color: mix(#fff, #000, 20%);
  font-size: 2rem;
  font-weight: lighter;
}

.user-details {
  .header,
  .stats {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .stats .stat {
    margin-right: 2rem;
    font-size: 1.2rem;
  }
}
.link-edit-profile {
  padding: 0.45rem 0.55rem;
  color: mix(#fff, #000, 30%);
  border: 1px solid mix(#000, #fff, 30%);
  border-radius: 3px;
  background-color: #fff;
}

.link-edit-profile-mobile {
  display: none;
}

.personal-details {
  font-size: 1.1rem;
  .bio {
    width: 100%;
    line-height: 1.5rem;
  }
}

.mobile-stats {
  display: none;
}

.tabs {
  border-top: 1px solid mix(#000, $page-bg, 10%);
  width: $max-content-width;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(4, 110px);
  column-gap: 2rem;
  justify-content: center;

  .tab {
    text-transform: uppercase;
    padding: 1.5rem 1rem;
    text-align: center;
    color: mix(#fff, #000, 30%);
    border-top: 1px solid transparent;
    transform: translateY(-1px);
    font-size: 0.85rem;

    &.selected {
      border-color: mix(#fff, #000, 10%);
    }
  }
}

.content {
  max-width: $max-content-width;
  margin-left: auto;
  margin-right: auto;
}

@media screen and (max-width: $max-content-width) {
  .user-details-container,
  .tabs,
  .content {
    width: 100%;
  }

  .tabs {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .user-details-container {
    grid-template-columns: auto;
    padding-left: 2rem;

    .user-pic {
      justify-self: flex-start;
      margin-bottom: 1rem;
    }
  }
  .link-edit-profile-mobile {
    display: block;
  }

  .link-edit-profile-desktop {
    display: none;
  }
  .mobile-stats {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid mix(#000, $page-bg, 10%);
    .stat {
      text-align: center;
      display: flex;
      flex-direction: column;
      padding: 1rem;
    }
  }

  .desktop-stats {
    display: none;
  }

  .tabs {
    .text {
      display: none;
    }
    .icon {
      font-size: 1.35rem;
    }
  }
}
</style>
