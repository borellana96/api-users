<template>
    <div v-if="user" class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detailsModalLabel">Detalles del Usuario</h5>
                </div>
                <div class="modal-body">
                    <p><strong>ID:</strong> {{ user.id }}</p>
                    <p><strong>Nombre:</strong> {{ user.name }}</p>
                    <p><strong>Email:</strong> {{ user.email }}</p>
                    <p><strong>Ciudad:</strong> {{ user.address.city }}</p>
                    <p><strong>Teléfono:</strong> {{ user.phone }}</p>
                    <p><strong>Empresa:</strong> {{ user.company.name }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Volver a la
                        Lista</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';

// Emitir el evento para cerrar el modal
const emit = defineEmits(['close']);

const close = () => {
    emit('close');
};

defineProps({
    user: {
        type: Object,
        required: true,
    },
})

onMounted(() => {
    const modal = new window.bootstrap.Modal(document.getElementById('detailsModal'));
    modal.show();
});

</script>

<style scoped>
.modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5) !important;
}
</style>
