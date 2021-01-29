<template>
  <div class="page-not-found py-12">
    <h1 class="mb-6">Sorry, this page isn't available.</h1>
    <p>
      The link you followed may be broken, or the page may have been removed.
      <router-link to="/">Go back to Instagram.</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class PageNotFound extends Vue {
  @Prop(String) readonly user_name!: string
}
</script>

<style lang="scss" scoped>
.page-not-found {
  text-align: center;
}
</style>