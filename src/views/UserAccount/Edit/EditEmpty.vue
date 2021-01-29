<template>
  <div class="edit-empty"><h1>This page is empty</h1></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class EditEmpty extends Vue {
  @Prop(String) readonly user_name!: string
}
</script>

<style lang="scss" scoped>
.edit-empty {
  text-align: center;
}
</style>