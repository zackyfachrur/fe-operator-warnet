import { ref, computed } from "vue";
import { useGlobalRefs } from "../store/useGLobalRefs";

export const useLoginForm = () => {
  const username = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const { isLoggedIn } = useGlobalRefs();

  const errors = ref<{
    username?: string;
    password?: string;
    confirmPassword?: string;
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

  const submitForm = () => {
    const isValid = validateForm();

    if (isValid) {
      alert(`Login sukses\nUsername: ${username.value}`);
      isLoggedIn.value = true;
      localStorage.setItem("username", username.value);
      localStorage.setItem("isLoggedIn", "true");
      username.value = "";
      password.value = "";
      confirmPassword.value = "";
    } else {
      isLoggedIn.value = false;
      localStorage.setItem("isLoggedIn", "false");
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
