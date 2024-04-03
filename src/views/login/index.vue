<template>
  <div class="login-box">
    <div class="login-logo">
      <img src="~@/assets/images/logo.png" width="45" />
      <h1 class="mb-0 ml-2 text-3xl font-bold">Antdv Admin</h1>
    </div>
    <a-form layout="horizontal" :model="loginFormModel" @submit.prevent="handleSubmit">
      <a-form-item>
        <a-input v-model:value="loginFormModel.username" size="large" placeholder="admin">
          <template #prefix> <UserOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="loginFormModel.password" size="large" type="password" placeholder="a123456" autocomplete="new-password">
          <template #prefix> <LockOutlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" :loading="loading" block> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/store/modules/user';

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const loginFormModel = ref({
  username: 'admin',
  password: 'a123456',
});

const handleSubmit = async () => {
  const { username, password } = loginFormModel.value;
  if (username.trim() == '' || password.trim() == '') {
    return message.warning('用户名或密码不能为空！');
  }
  loading.value = true;
  console.log(loginFormModel.value);
  // todo 登录请求
  // 登录成功后记录token
  userStore.setToken(loginFormModel.value);
  router.push({
    path: '/',
  });
};
</script>

<style lang="less" scoped>
.login-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 240px;
  background: url('@/assets/login.svg');
  background-size: 100%;

  .login-logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .svg-icon {
      font-size: 48px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
