<script setup>
import { ref, onMounted, computed } from 'vue';
import UserDetail from './UserDetail.vue';
import { useUserStore } from '@/stores/counter';

// Declaramos las variables reactivas
const dataTable = ref([]);
const error = ref(null);
const searchQuery = ref('');


// Obtener los datos de la API
const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const result = await response.json();
    dataTable.value = result;
  } catch (err) {
    error.value = err.message;
  }
};

// Llamamos a la función cuando el componente se monte
onMounted(fetchData);

// Para filtrar los datos según la búsqueda
const filteredData = computed(() => {
  if (!searchQuery.value) {
    return dataTable.value;
  }
  return dataTable.value.filter(item => {
    // Filtramos por nombre
    return item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});


// Estado para controlar el modal
const isModalVisible = ref(false);
const selectedUser = ref(null);

// Acceder al store de Pinia
const userStore = useUserStore();

// Función para seleccionar un usuario
const selectUser = (user) => {
  selectedUser.value = user;
  isModalVisible.value = true;
  userStore.setSelectedUser(user);
};

// Función para cerrar el modal
const closeModal = () => {
  isModalVisible.value = false;
};

</script>

<template>
  <div class="container">
    <h1>Lista de Usuarios</h1>
    <input v-model="searchQuery" type="text" class="form-control" placeholder="Ingrese un nombre...">
  </div>

  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo Electrónico</th>
          <th scope="col">Ciudad</th>
        </tr>
      </thead>
      <tbody v-if="filteredData.length">

        <tr v-for="(user, index) in filteredData" :key="index" @click="selectUser(user)">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.city }}</td>
        </tr>

      </tbody>

      <p v-else>
        No hay datos para mostrar
      </p>
    </table>

  </div>
  <!-- Modal que se abrirá al seleccionar una fila -->
  <UserDetail v-if="isModalVisible" :user="selectedUser" @close="closeModal" />
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
