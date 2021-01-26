<template>
  <div class="log-in my-6">
    <div class="content-container panel mx-auto my-6 px-12">
      <div class="header mb-6">
        <h1 class="my-6">Instagram</h1>
      </div>

      <div class="sign-up-form mb-12">
        <FormulateForm
          v-model="signUpForm"
          :schema="signUpFormSchema"
          @submit="emailSignUp"
        ></FormulateForm>
      </div>

      <div class="auth-options">
        <div class="or mb-12">OR</div>
        <button
          class="btn btn-login-facebook mx-auto mb-6"
          @click="firebaseEmailPasswordSignup"
        >
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
import { userAccountsPath } from '@/vendor/firebase/dbrefs'

import { ui } from '@/vendor/firebase'

@Component
export default class SignUp extends Vue {
  signUpFormSchema = [
    {
      class: 'mb-2',
      name: 'username_number_or_email',
      placeholder: 'Phone number, username or email',
      validationName: 'Phone number, username or email',
      validation: 'required',
    },

    {
      class: 'mb-4',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validationName: 'Password',
      validation: 'required',
    },
    {
      type: 'submit',
      label: 'Log in',
      class: 'mb-2',
    },
  ]
  signUpForm = {}

  firebaseEmailPasswordSignup() {
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
    })
  }

  emailSignUp(form: {
    number_or_email: string
    full_name: string
    user_name: string
    password: string
  }) {
    // TODO Check if number_or_email is a phone number or email
    const isEmailRegex = /\w+@\w+\.[a-z]+/
    const isAnEmailAddress = isEmailRegex.test(form.number_or_email)

    // TODO If not an email, check is number is valid

    const userSignupDetails = {
      email: isAnEmailAddress ? form.number_or_email : '',
      phone: !isAnEmailAddress ? form.number_or_email : '',
      full_name: form.full_name,
      user_name: form.user_name,
      password: form.password,
    }

    console.log(userSignupDetails)

    firebase
      .database()
      .ref(userAccountsPath(form.user_name))
      .update(userSignupDetails, (error) => {
        if (error) {
          alert(error)
        } else {
          alert(`Sign up successful as ${userSignupDetails.user_name}`)
        }
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