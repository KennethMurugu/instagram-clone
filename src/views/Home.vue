<template>
  <div class="home mx-auto pt-8">
    <Reels class="mb-6" />

    <UserPost v-for="i in 5" :key="i" class="mb-6" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Reels from '@/components/Reels'
import UserPost from '@/components/UserPost'

@Component({
  components: { Reels, UserPost },
})
export default class Home extends Vue {
  mounted() {
    this.$store.commit('toggleTopNav', true)
  }
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 614px;
}
</style>
