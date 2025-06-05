<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content error-modal">
      <h4 class="modal-title">Lỗi</h4>
      <p>{{ errorMessage }}</p>
      <div class="modal-actions">
        <button class="btn btn-primary" @click="closeModal">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
}

.error-modal {
  background-color: #f8d7da;
  color: #721c24;
  border-color: #f5c6cb;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
