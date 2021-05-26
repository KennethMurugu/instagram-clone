<template>
  <div class="log-in my-6">
    <div class="content-container panel mx-auto my-6 px-12">
      <div class="header mb-6">
        <h1 class="my-6">Instagram</h1>
      </div>

      <div class="sign-up-form mb-12">
        <Notice :type="loginNotice.type" v-if="loginNotice.msg">{{
          loginNotice.msg
        }}</Notice>
        <FormulateForm
          v-model="loginForm"
          :schema="loginFormSchema"
          @submit="firebaseEmailPasswordLogin"
        >
          <FormulateInput type="submit" class="mb-2" :disabled="isWorking">
            <fa-icon
              icon="spinner"
              :spin="true"
              class="fa-lg"
              v-if="isWorking"
            ></fa-icon>
            <span v-else>Log in</span>
          </FormulateInput>
        </FormulateForm>
      </div>

      <div class="auth-options">
        <div class="or mb-12">OR</div>
        <button class="btn btn-login-facebook mx-auto mb-6">
          <fa-icon :icon="['fab', 'facebook-square']" class="fb-icon"></fa-icon>
          Login with Facebook
        </button>

        <p class="text-center">
          <router-link to="/login">Forgot password?</router-link>
        </p>
      </div>
    </div>

    <div class="login-option mx-auto panel">
      Don't have an account? <router-link to="/signup">Sign up</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '@/vendor/firebase'
import { UserAccount } from '@/vendor/firebase/db/models'
import { NoticeOptions } from '@/components/Notice.vue'
import { isUserLoggedIn, STORE_COMMITS } from '@/store/utils'

@Component
export default class Login extends Vue {
  loginFormSchema = [
    {
      class: 'mb-2',
      name: 'email',
      type: 'email',
      label: 'Email:',
      placeholder: 'Email',
      validationName: 'Email',
      validation: 'required',
    },

    {
      class: 'mb-4',
      name: 'password',
      type: 'password',
      label: 'Password:',
      placeholder: 'Password',
      validationName: 'Password',
      validation: 'required',
    },
  ]
  loginForm = {}
  isWorking = false
  loginNotice: NoticeOptions = {
    type: 'info',
    msg: '',
  }

  mounted() {
    this.$store.commit('toggleTopNav', false)

    if (isUserLoggedIn(this)) {
      this.$router.push('/')
    }
  }

  firebaseEmailPasswordLogin(form: { email: string; password: string }) {
    console.log(form)

    this.isWorking = true
    this.loginNotice.msg = ''
    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((userCredentials) => {
        // Fetch the user account from db so we can store it in state
        return firebase
          .database()
          .ref(`accounts/${userCredentials.user?.uid}`)
          .get()
      })
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userAccount: UserAccount = snapshot.toJSON()!

          this.$store.commit(STORE_COMMITS.SET_USER_ACCOUNT, userAccount)

          this.loginNotice.type = 'success'
          this.loginNotice.msg = `Login successful as ${userAccount.email}`

          // Artificial delay while we wait for the state to update
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        }
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        console.error(error)
        // alert('Something went wrong: ' + errorMessage)
        this.loginNotice.type = 'error'
        this.loginNotice.msg = 'Something went wrong: ' + errorMessage
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
