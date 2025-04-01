import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore  = defineStore('user', () => {
  const lastUser = ref({
    id: null,
    name: '',
    email: '',
    address: Object,
    phone: '',
    company: Object
  });

  function setSelectedUser(user) {
    this.lastUser.value = {...user};
  }

  return { lastUser }
})
