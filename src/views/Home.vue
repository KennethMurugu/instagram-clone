<template>
  <div class="home">
    <TopNav />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TopNav from '@/components/TopNav.vue'

@Component({
  components: { TopNav },
})
export default class Home extends Vue {}
</script>


<style lang="scss" scoped>
</style>
