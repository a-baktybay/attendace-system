import { ref } from "vue";
import { pfm } from '@/shared/api';

export function useAuth() {
  const login = ref('');
  const password = ref('');
  const isError = ref(false);
  function auth() {
    return pfm
      .auth(login.value, password.value)
      .then(({ data }) => {
        isError.value = false;
      })
      .catch(() => isError.value = true);
  }

  function onChangeLogin(e) {
    login.value = e;
  }

  function onChangePassword(e) {
    password.value = e;
  }

  return {
    auth,
    onChangeLogin,
    onChangePassword,
    isError
  };
}