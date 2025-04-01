import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isModalVisible = ref(false)

  const abrirModal = () => {
    isModalVisible.value = true
  }

  const cerrarModal = () => {
    isModalVisible.value = false
  }

  return { isModalVisible, abrirModal, cerrarModal }
})