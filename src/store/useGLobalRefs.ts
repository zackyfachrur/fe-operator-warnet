import { inject, type Ref } from "vue";

export const useGlobalRefs = () => {
  const isLoggedIn = inject<Ref<boolean>>("isLoggedIn");
  const showSidebar = inject<Ref<boolean>>("showSidebar");
  const showCreateBilling = inject<Ref<boolean>>("showCreateBilling");

  if (!isLoggedIn || !showSidebar) {
    throw new Error("Global refs tidak tersedia");
  }
  return { isLoggedIn, showSidebar, showCreateBilling };
};
