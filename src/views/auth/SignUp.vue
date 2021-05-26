<template>
  <div class="sign-up my-6">
    <div class="content-container panel mx-auto my-6 px-12">
      <div class="header mb-6">
        <h1 class="my-6">Instagram</h1>
        <h3 class="subtitle px-3">
          Sign up to see photos and videos from your friends.
        </h3>
      </div>

      <div class="auth-options mb-6">
        <button
          class="btn btn-login-facebook mx-auto mb-6"
          @click.prevent="signUpWithFacebook"
        >
          <fa-icon :icon="['fab', 'facebook-square']" class="fb-icon"></fa-icon>
          Sign up with Facebook
        </button>

        <div class="or">OR</div>
      </div>

      <div class="sign-up-form">
        <Notice :type="signupNotice.type" v-if="signupNotice.msg">{{
          signupNotice.msg
        }}</Notice>
        <FormulateForm
          v-model="signUpForm"
          :schema="signUpFormSchema"
          @submit="emailSignUp"
        >
          <FormulateInput type="submit" class="mb-2" :disabled="isWorking">
            <fa-icon
              icon="spinner"
              :spin="true"
              class="fa-lg"
              v-if="isWorking"
            ></fa-icon>
            <span v-else>Sign up</span>
          </FormulateInput>

          <p class="mb-6">
            <small
              >By signing up, you agree to our Terms, Data Policy and Cookies
              Policy
            </small>
          </p>
        </FormulateForm>
        <Notice :type="signupNotice.type" v-if="signupNotice.msg">{{
          signupNotice.msg
        }}</Notice>
      </div>
    </div>

    <div class="login-option mx-auto panel">
      Have an account? <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'
import { userAccountsPath, usernamesPath } from '@/vendor/firebase/db/refs'
import { NoticeOptions } from '@/components/Notice.vue'
import { use } from 'vue/types/umd'
import { UserAccount } from '@/vendor/firebase/db/models'
import { STORE_COMMITS } from '@/store/utils'

// import { ui } from '@/vendor/firebase'

@Component({})
export default class SignUp extends Vue {
  signUpFormSchema = [
    {
      class: 'mb-2',
      name: 'email',
      label: 'Email:',
      placeholder: 'Email',
      validationName: 'Email',
      validation: 'required',
    },
    {
      class: 'mb-2',
      name: 'full_name',
      label: 'Full Name:',
      placeholder: 'Full Name',
      validationName: 'Full Name',
      validation: 'required',
    },
    {
      class: 'mb-2',
      name: 'user_name',
      label: 'Username:',
      placeholder: 'Username',
      validationName: 'Username',
      validation: 'required|alphanumeric',
    },
    {
      class: 'mb-4',
      name: 'password',
      type: 'password',
      label: 'Password:',
      placeholder: 'Password',
      validationName: 'Password',
      validation: 'required|min:6,length',
    },
    {
      class: 'mb-4',
      type: 'password',
      label: 'Confirm password:',
      placeholder: 'Confirm password',
      validationName: 'Password confirmation',
      validation: '^required|confirm:password',
    },
  ]
  signUpForm = {}
  isWorking = false
  signupNotice: NoticeOptions = {
    type: 'info',
    msg: '',
  }

  mounted() {
    this.$store.commit('toggleTopNav', false)
  }

  signUpWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider()
    provider.addScope('public_profile')
    provider.setCustomParameters({
      display: '',
    })

    this.signupNotice.msg = ''
    this.isWorking = true
    let createdUser: firebase.User
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user
        // alert(JSON.stringify(user))
        createdUser = user!

        firebase.auth().updateCurrentUser(user)

        return this.checkIfUserAlreadyHasAccountInDB(user?.uid!)
      })
      .then((snapshot) => {
        if (snapshot.exists()) {
          // this user exists;
          throw new Error(
            `Looks like you already have an account. Please login with that account.`
          )
        } else {
          //Continue with signup

          let userSignupDetails = {
            uid: createdUser.uid!,
            email: createdUser.email!,
            phone: '',
            full_name: createdUser.displayName!,
            user_name: createdUser.displayName!,
            password: 'NO_NEED_FOR_PASS',
            bio: '',
            profile_photo:
              process.env.BASE_URL + '/user-profile-photo-placeholder.svg',
          }

          return this.createUserAccountInDatabase(userSignupDetails)
        }
      })
      .then(() => {
        return this.addUserNameToDatabase(
          createdUser.uid!,
          createdUser.displayName!
        )
      })
      // Fetch account
      .then(() => {
        return firebase
          .database()
          .ref(`accounts/${createdUser.uid}`)
          .once('value')
      })
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userAccount: UserAccount = snapshot.toJSON()!

          this.$store.commit(STORE_COMMITS.SET_USER_ACCOUNT, userAccount)

          this.signupNotice.type = 'success'
          this.signupNotice.msg = `Signup with Facebook successful!`

          // Artificial delay while we wait for the state to update
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
      .catch((error) => {
        console.error(error)
        this.signupNotice.type = 'error'
        this.signupNotice.msg = 'Something went wrong: ' + error.message
        this.isWorking = false
      })
  }

  checkIfUserAlreadyHasAccountInDB(uid: string) {
    return firebase
      .database()
      .ref('/accounts/' + uid)
      .once('value')
  }

  checkIfUserNameExists(username: string) {
    return firebase
      .database()
      .ref('/usernames/' + username)
      .once('value')
  }

  createUserCredentials(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  createUserAccountInDatabase(userSignupDetails: { uid: string }) {
    return firebase
      .database()
      .ref(`/accounts/${userSignupDetails.uid}`)
      .set(userSignupDetails)
  }

  addUserNameToDatabase(uid: string, user_name: string) {
    return firebase.database().ref(usernamesPath(uid)).set(user_name)
  }

  emailSignUp(form: {
    email: string
    full_name: string
    user_name: string
    password: string
  }) {
    console.log(form)

    this.isWorking = true
    let userSignupDetails = {
      uid: '',
      email: form.email,
      phone: '',
      full_name: form.full_name,
      user_name: form.user_name,
      password: form.password,
      bio: '',
      profile_photo:
        process.env.BASE_URL + '/user-profile-photo-placeholder.svg',
    }
    // Check if username is unique
    this.checkIfUserNameExists(form.user_name)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // this user exists;
          throw new Error(`The username ${form.user_name} is already taken.`)
        } else {
          // Sign up user with credentials
          return this.createUserCredentials(form.email, form.password)
        }
      })
      // Credentails created...now store username in db
      .then((result) => {
        userSignupDetails.uid = result.user?.uid!
        return this.addUserNameToDatabase(result.user?.uid!, form.user_name)
      })
      .then(() => {
        // Create user account in DB
        return this.createUserAccountInDatabase(userSignupDetails)
      })

      .then(() => {
        this.signupNotice.type = 'success'
        this.signupNotice.msg = `Signup successful as ${form.email}`
        this.$router.push('/')
      })
      .catch((error) => {
        console.error(error)
        this.signupNotice.type = 'error'
        this.signupNotice.msg = 'Something went wrong: ' + error.message
      })
      .finally(() => {
        this.isWorking = false
      })
  }
}
</script>

<style lang="scss" scoped>
.content-container {
  max-width: 350px;
}

.header {
  text-align: center;
}

.subtitle {
  color: mix(#fff, #000, 50%);
}

.auth-options {
  .btn-login-facebook {
    width: 100%;
  }
  .or {
    display: flex;
    place-items: center;
    justify-content: center;
    font-weight: bold;
    color: mix(#fff, #000, 70%);
    font-size: 0.9rem;

    &::before,
    &::after {
      margin: 0 1rem;
      width: 100px;
      height: 1px;
      background-color: mix(#fff, #000, 70%);
      display: block;
      content: '';
    }
  }
}

.login-option {
  max-width: 350px;
  text-align: center;
}
</style>
