<template>
  <div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3>Đổi mật khẩu</h3>
        <div class="form-group">
          <label for="currentPassword">Mật khẩu hiện tại</label>
          <input v-model="currentPassword" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <label for="newPassword">Mật khẩu mới</label>
          <input v-model="newPassword" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Xác nhận mật khẩu mới</label>
          <input v-model="confirmPassword" type="password" class="form-control" />
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary" @click="changePassword">Xác nhận</button>
          <button class="btn btn-secondary" @click="closeModal">Hủy</button>
        </div>
      </div>
    </div>

    <ErrorModalChangePass
        v-if="showErrorModal"
        :errorMessage="errorMessage"
        @close="showErrorModal = false"
    />
  </div>
</template>

<script>
import ErrorModalChangePass from "./ErrorModalChangePass.vue";
import axios from "@/services/api.js";

export default {
  name: "ChangePassword",
  components: {
    ErrorModalChangePass
  },
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close"],
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      showErrorModal: false,
      errorMessage: ""
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.showError("Mật khẩu mới và xác nhận không khớp!");
        return;
      }

      try {
        await axios.put("/user/change-password", {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        });

        alert("Đổi mật khẩu thành công!");
        this.closeModal();
      } catch (error) {
        this.showError(
            error.response?.data?.message || "Đổi mật khẩu thất bại! Vui lòng thử lại."
        );
      }
    },
    showError(message) {
      this.errorMessage = message;
      this.showErrorModal = true;
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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.form-group {
  margin-bottom: 15px;
}
</style>
