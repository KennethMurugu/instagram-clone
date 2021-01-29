<template>
  <div class="home">Reel and Posts</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  mounted() {
    this.$store.commit('toggleTopNav', true)
  }
}
</script>

<style lang="scss" scoped></style>
