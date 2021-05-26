<template>
  <div
    class="notice my-2 py-0 px-3"
    :class="[type, { dismissable: dismissable }]"
  >
    <span>
      <fa-icon
        icon="check-circle"
        class="fa-lg mr-3"
        v-if="type === 'success'"
      ></fa-icon>
      <fa-icon
        icon="exclamation"
        class="fa-lg mr-3"
        v-if="type === 'info'"
      ></fa-icon>
      <fa-icon
        icon="exclamation-triangle"
        class="fa-lg mr-3"
        v-if="type === 'error'"
      ></fa-icon>
    </span>
    <p class="text my-3">
      <slot></slot>
    </p>
    <fa-icon icon="times" class="fa-lg icon" v-if="dismissable"></fa-icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

export interface NoticeOptions {
  type: 'success' | 'error' | 'info'
  msg?: string
}

@Component({})
export default class Notice extends Vue {
  @Prop({ default: 'info' }) readonly type!: string
  @Prop({ default: false }) readonly dismissable!: boolean
  // ========= Data ================================= //
  // ========= Computed Properties ================== //
  // ========= Lifecycle methods ==================== //
  // ========= Methods ============================== //
}
</script>

<style lang="scss" scoped>
.notice {
  display: flex;
  align-items: center;
  border-radius: 3px;

  &.dismissable {
    grid-template-columns: auto 50px;
  }

  .icon {
    justify-self: center;
    cursor: pointer;
  }
}

.success {
  border: 1px solid $success;
  background-color: transparentize($color: $success, $amount: 0.9);
}
.error {
  border: 1px solid $error;
  background-color: transparentize($color: $error, $amount: 0.9);
}
.info {
  border: 1px solid $info;
  background-color: transparentize($color: $info, $amount: 0.9);
}
</style>
