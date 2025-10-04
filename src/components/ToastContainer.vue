<template>
    <div class="toast-container">
        <TheToast v-for="toast in toasts" :key="toast.id" :type="toast.type" :title="toast.title"
            :description="toast.description" :action="toast.action" @click="removeToast(toast.id)" />
    </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'
import TheToast from '@/components/ui/TheToast.vue'

const { toasts, removeToast } = useToast()
</script>

<style lang="scss">
.toast-container {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: none;

    >* {
        pointer-events: auto;
    }
}
</style>
