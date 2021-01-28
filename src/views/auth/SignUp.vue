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
import { userAccountsPath } from '@/vendor/firebase/dbrefs'

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

  checkIfUserNameExists(user_name: string) {
    return firebase
      .database()
      .ref('/accounts/' + user_name)
      .once('value')
  }

  createUserCredentials(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  createUserAccountInDatabase(userSignupDetails: {
    uid: string
    email: string
    phone: string
    full_name: string
    user_name: string
    password: string
  }) {
    return firebase
      .database()
      .ref(userAccountsPath(userSignupDetails.user_name))
      .set(userSignupDetails)
  }

  emailSignUp(form: {
    email: string
    full_name: string
    user_name: string
    password: string
  }) {
    console.log(form)

    this.isWorking = true
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
      .then((userCredential) => {
        // Create user account in DB
        const userSignupDetails = {
          uid: userCredential.user?.uid!,
          email: form.email,
          phone: '',
          full_name: form.full_name,
          user_name: form.user_name,
          password: form.password,
        }

        return this.createUserAccountInDatabase(userSignupDetails)
      })
      .then((database) => {
        alert(`Signed up as ${form.email}`)
      })
      .catch((error) => {
        console.error(error)
        alert('Something went wrong: ' + error.message)
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