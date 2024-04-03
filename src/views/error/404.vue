<template>
  <div class="bg403">
    <div class="error-box">
      <img src="@/assets/images/error-403.png" />
      <h2>404</h2>
      抱歉，您无权访问该页面。
    </div>
  </div>
</template>
<style lang="less" scoped>
.bg403 {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  .error-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
