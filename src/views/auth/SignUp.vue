<template>
  <div class="sign-up">
    <div class="content-container panel mx-auto my-6 px-12">
      <div class="header mb-6">
        <h1 class="my-6">Instagram</h1>
        <h3 class="subtitle px-3">
          Sign up to see photos and videos from your friends.
        </h3>
      </div>

      <div class="auth-options mb-6">
        <button class="btn btn-login-facebook mx-auto mb-6">
          <fa-icon :icon="['fab', 'facebook-square']" class="fb-icon"></fa-icon>
          Login with Facebook
        </button>

        <div class="or">OR</div>
      </div>

      <div class="sign-up-form">
        <FormulateForm
          v-model="signUpForm"
          :schema="signUpFormSchema"
        ></FormulateForm>
      </div>
    </div>

    <div class="login-option mx-auto panel">
      Have an account? <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SignUp extends Vue {
  signUpFormSchema = [
    {
      class: 'mb-2',
      name: 'name',
      placeholder: 'Mobile number or email',
      validationName: 'Mobile number or email',
      validation: 'required',
    },
    {
      class: 'mb-2',
      name: 'full_name',

      placeholder: 'Full Name',
      validationName: 'Full Name',
      validation: 'required',
    },
    {
      class: 'mb-2',
      name: 'user_name',
      placeholder: 'Username',
      validationName: 'Username',
      validation: 'required',
    },
    {
      class: 'mb-2',
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validationName: 'Password',
      validation: 'required',
    },
    {
      class: 'mb-4',
      name: 'password_confirm',
      type: 'password',
      placeholder: 'Confirm password',
      validationName: 'Password confirmation',
      validation: '^required|confirm:password',
    },
    {
      type: 'submit',
      label: 'Sign up',
    },
  ]
  signUpForm = {}
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