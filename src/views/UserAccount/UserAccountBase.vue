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
          <router-link to="/accounts/edit" class="link-edit-profile mr-6"
            >Edit Profile</router-link
          >
          <fa-icon icon="cog" class="fa-2x"></fa-icon>
        </div>
        <div class="stats mb-7">
          <p class="stat">
            <b class="count">0</b>
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

    <div class="page-content">
      <div class="tabs mb-0">
        <router-link
          :to="`/${userAccount.user_name}`"
          class="tab"
          :class="{ selected: activeTab == 0 }"
          @click.native="activeTab = 0"
        >
          <fa-icon icon="border-all" class="fa-fw"></fa-icon> Posts
        </router-link>
        <router-link
          :to="`/${userAccount.user_name}/channel`"
          class="tab"
          :class="{ selected: activeTab == 1 }"
          @click.native="activeTab = 1"
        >
          <fa-icon icon="tv" class="fa-fw"></fa-icon> IGTV
        </router-link>
        <router-link
          :to="`/${userAccount.user_name}/saved`"
          class="tab"
          :class="{ selected: activeTab == 2 }"
          @click.native="activeTab = 2"
        >
          <fa-icon :icon="['far', 'bookmark']" class="fa-fw"></fa-icon> Saved
        </router-link>
        <router-link
          :to="`/${userAccount.user_name}/tagged`"
          class="tab"
          :class="{ selected: activeTab == 3 }"
          @click.native="activeTab = 3"
        >
          <fa-icon icon="user-tag" class="fa-fw"></fa-icon> Tagged
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

@Component({})
export default class UserAccountBase extends Vue {
  @Prop(String) readonly user_name!: string
  currentUserName = ''
  userAccount: UserAccount = this.$store.state.userAccount
  activeTab = 0
  userProfileUrl = '/user-profile-photo-placeholder.svg'
  isLoading = true

  mounted() {
    this.$store.commit('toggleTopNav', true)

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

.personal-details {
  font-size: 1.1rem;
  .bio {
    width: 100%;
    line-height: 1.5rem;
  }
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
</style>
