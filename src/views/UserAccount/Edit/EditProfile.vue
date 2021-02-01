<template>
  <div class="edit-profile">
    <div class="row">
      <div class="section-left">
        <img :src="userProfileUrl" alt="" class="user-pic" />
      </div>
      <div class="section-right">
        <h2 class="mb-1">{{ userAccount.user_name }}</h2>
        <!-- <button class="btn">Change profile photo</button> -->
        <FormulateInput
          type="image"
          label="Change profile photo"
          validation="mime:image/jpeg,image/jpg,image/png"
          :uploader="userImgSelected"
        />
      </div>
    </div>

    <div class="row">
      <div class="section-left">
        <h3>Name</h3>
      </div>
      <div class="section-right">
        <input
          type="text"
          class="edit-profile-input mb-2"
          v-model="userAccount.full_name"
        />
        <p>
          <small>
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </small>
        </p>
        <br />
        <p>
          <small> You can only change your name twice within 14 days.</small>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="section-left">
        <h3>Username</h3>
      </div>
      <div class="section-right">
        <input
          type="text"
          class="edit-profile-input mb-2"
          v-model="userAccount.user_name"
          disabled
        />
        <p>
          <small>
            In most cases, you'll be able to change your username back to
            {{ userAccount.user_name }} for another 14 days.
          </small>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="section-left">
        <h3>Bio</h3>
      </div>
      <div class="section-right">
        <textarea
          class="edit-profile-input"
          rows="5"
          v-model="userAccount.bio"
        />
      </div>
    </div>

    <div class="row">
      <div class="section-left">
        <h3>Phone Number</h3>
      </div>
      <div class="section-right">
        <input
          type="text"
          class="edit-profile-input"
          v-model="userAccount.phone"
        />
      </div>
    </div>

    <div class="row">
      <div class="section-left"></div>
      <div class="section-right">
        <button class="btn" @click="updateUserAccountDetails">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { UserAccount } from '@/vendor/firebase/db/models'
import { userAccountsPath, usernamesPath } from '@/vendor/firebase/db/refs'
import firebase from '@/vendor/firebase'
import { getUserProfilePhotoFromStorage } from '@/vendor/firebase/db/utils'

@Component({})
export default class EditProfile extends Vue {
  userAccount: UserAccount = this.$store.state.userAccount
  userProfileUrl = '/user-profile-photo-placeholder.svg'

  mounted() {
    this.getUserProfilePhotoFromStorage()
  }

  updateUserAccountDetails() {
    firebase
      .database()
      .ref(`/accounts/${this.userAccount.uid}`)
      .update(this.userAccount)
      .then(() => {
        alert('Profile updated successfully!')
      })
      .catch(error => {
        console.error(error)
        alert(error.message)
      })
  }

  userImgSelected(file: Blob, progress: (val: number) => void) {
    progress(25)
    // Upload to storage:profile_photos/<user_id>
    const profilePhotoRef = firebase
      .storage()
      .ref(`profile_photos/${this.userAccount.uid}`)
    profilePhotoRef
      .put(file)
      .then(snapshot => {
        progress(75)

        // Update db:accounts/<user_name>/profile_photo
        return firebase
          .database()
          .ref(`accounts/${this.userAccount.uid}`)
          .update({ profile_photo: this.userAccount.uid })
      })
      .then(() => {
        progress(100)
        alert('Profile photo uploaded successfully')
        this.getUserProfilePhotoFromStorage()
      })
      .catch(error => {
        alert('Error uploading profile photo: ' + error.message)
      })
  }

  getUserProfilePhotoFromStorage() {
    getUserProfilePhotoFromStorage()
      .then(url => {
        this.userProfileUrl = url
      })
      .catch(error => {
        console.error(error)
        alert('Could not get user profile photo: ' + error.message)
      })
  }
}
</script>

<style lang="scss" scoped>
.user-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.row {
  display: grid;
  grid-template-columns: 170px 350px;
  margin-bottom: 1.5rem;
  .section-left {
    text-align: right;
    margin-right: 3rem;
    padding-top: 0.65rem;
  }
}

.edit-profile-input {
  padding: 0.35rem 1rem;
  border: 1px solid mix(#000, $page-bg, 15%);
  border-radius: 3px;
  font-size: 1.2rem;
  width: 100%;
}

textarea {
  resize: vertical;
}
</style>
