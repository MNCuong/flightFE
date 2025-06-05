<template>
  <div class="loading-spinner d-flex justify-center align-center">
    <div class="spinner-border text-primary" role="status"></div>
    <span class="ms-2">Đang tải dữ liệu...</span>
  </div>
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>

<style scoped>
.loading-spinner {
  margin: 20px 0;
  text-align: center;
  font-weight: 500;
}
</style>
