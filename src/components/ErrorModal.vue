<template>
  <div v-if="isVisible" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <h5 class="modal-title">Thông báo lỗi</h5>
        <p>{{ message }}</p>
        <button class="btn btn-danger" @click="closeModal">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    openModal(msg) {
      this.message = msg;
      this.visible = true;
    },
    closeModal() {
      this.isVisible = false;
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-wrapper {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}
</style>
