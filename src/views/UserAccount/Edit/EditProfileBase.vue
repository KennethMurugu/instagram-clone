<template>
  <div class="edit-profile-base mt-8">
    <div class="account-items-container">
      <div class="tabs">
        <router-link to="/accounts/edit" class="item selected">
          Edit Profile
        </router-link>
        <router-link to="/accounts/password/change" class="item">
          Change Password
        </router-link>
        <router-link to="/accounts/manage_access" class="item">
          Apps and Websites
        </router-link>
        <router-link to="/emails/settings" class="item">
          Email and SMS
        </router-link>
        <router-link to="/push/web/settings" class="item">
          Push Notifications
        </router-link>
        <router-link to="/accounts/contact_history" class="item">
          Manage Contacts
        </router-link>
        <router-link to="/accounts/privacy_and_security" class="item">
          Privacy and Security
        </router-link>
        <router-link to="/session/loggin_activity" class="item">
          Login Activity
        </router-link>
        <router-link to="/emails/emails_sent" class="item">
          Emails from Instagram
        </router-link>
      </div>
    </div>

    <div class="content px-8 py-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { isUserLoggedIn } from '@/store/utils'
import { UserAccount } from '@/vendor/firebase/db/models'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class EditProfileBase extends Vue {
  @Prop(String) readonly user_name!: string

  mounted() {
    this.$store.commit('toggleTopNav', true)
    if (!isUserLoggedIn(this)) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-profile-base {
  max-width: $max-content-width;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px auto;
  border: 1px solid mix(#000, $page-bg, 10%);
  border-radius: 3px;
  background-color: #fff;
}
.account-items-container {
  border-right: 1px solid mix(#000, $page-bg, 10%);
  .tabs {
    .item {
      padding: 1.25rem 2rem;
      font-size: 1.15rem;
      border-left: 2px solid transparent;
      display: block;
      color: #000;
      font-weight: normal;

      &.selected {
        border-color: mix(#fff, #000, 10%);
        font-weight: bold;
      }

      &:first-child {
        border-top-left-radius: 3px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .edit-profile-base {
    grid-template-columns: 1fr;
    max-width: 100%;
    margin: 0.25rem;
  }

  .account-items-container {
    display: none;
  }
}
</style>
