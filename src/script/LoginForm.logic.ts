import { ref, computed } from "vue";
import { useGlobalRefs } from "../store/useGLobalRefs";
import { login } from "../services/api";

export const useLoginForm = () => {
  const username = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const { isLoggedIn } = useGlobalRefs();

  const errors = ref<{
    username?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const passwordsMatch = computed(
    () => password.value === confirmPassword.value
  );

  const validateForm = () => {
    errors.value = {};

    if (!username.value.trim()) {
      errors.value.username = "Username wajib diisi";
    }
    if (!password.value) {
      errors.value.password = "Password wajib diisi";
    }
    if (!confirmPassword.value) {
      errors.value.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (!passwordsMatch.value) {
      errors.value.confirmPassword = "Password dan konfirmasi harus sama";
    }

    return Object.keys(errors.value).length === 0;
  };

  const submitForm = async () => {
    const isValid = validateForm();

    if (!isValid) {
      isLoggedIn.value = false;
      localStorage.setItem("isLoggedIn", "false");
      return;
    }

    try {
      const res = await login(username.value, password.value);

      isLoggedIn.value = true;
      localStorage.setItem("username", res.operator.username);
      localStorage.setItem("isLoggedIn", "true");

      username.value = "";
      password.value = "";
      confirmPassword.value = "";
      errors.value = {};
    } catch (error: any) {
      isLoggedIn.value = false;
      localStorage.setItem("isLoggedIn", "false");

      if (error.response?.data?.message) {
        errors.value.general = error.response.data.message;
      } else {
        errors.value.general = "Terjadi kesalahan saat login.";
      }
    }
  };

  return {
    username,
    password,
    confirmPassword,
    errors,
    submitForm,
  };
};
