<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 10px;
}

.modal-header,
.modal-body,
.modal-footer {
  padding: 10px;
}

.modal-header {
  display: flex;
  align-items: center;
}

.modal-body {
  min-height: 100px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
