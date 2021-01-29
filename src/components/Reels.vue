<template>
  <div class="reels pa-3">REELS GO HERE!! :)</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Reels extends Vue {}
</script>

<style lang="scss" scoped>
.reels {
  background-color: #fff;
  border: 1px solid mix(#000, $page-bg, 20%);
  border-radius: 3px;
}
</style>