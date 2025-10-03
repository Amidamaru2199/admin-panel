<template>
    <div class="pagination-wrapper">
        <div class="pagination-info">
            <span class="pagination-total">Всего пользователей {{ totalItems }}</span>
        </div>

        <div class="pagination-controls">
            <span class="pagination-page-info">Страница {{ currentPage }} из {{ totalPages }}</span>

            <div class="pagination-list">
                <button class="pagination-button pagination-button-nav" :disabled="currentPage === 1"
                    @click="goToFirstPage">
                    <ThePaginatorDoobleArrow />
                </button>

                <button class="pagination-button pagination-button-nav" :disabled="currentPage === 1"
                    @click="goToPrevPage">
                    <ThePaginatorArrow />
                </button>

                <button class="pagination-button pagination-button-nav" :disabled="currentPage === totalPages"
                    @click="goToNextPage">
                    <ThePaginatorArrow />
                </button>

                <button class="pagination-button pagination-button-nav" :disabled="currentPage === totalPages"
                    @click="goToLastPage">
                    <ThePaginatorDoobleArrow />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import ThePaginatorArrow from '@/components/icons/ThePaginatorArrow.vue'
import ThePaginatorDoobleArrow from '@/components/icons/ThePaginatorDoobleArrow.vue'

const props = defineProps({
    totalItems: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        default: 20
    },
    currentPage: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => {
    return Math.ceil(props.totalItems / props.itemsPerPage)
})

const goToFirstPage = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', 1)
    }
}

const goToPrevPage = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1)
    }
}

const goToNextPage = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1)
    }
}

const goToLastPage = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', totalPages.value)
    }
}
</script>

<style lang="scss">
.pagination-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
}

.pagination-info {
    display: flex;
    align-items: center;
}

.pagination-total {
    font-size: 14px;
    font-weight: 500;
    color: hsl(240 5% 64.9%);
}

.pagination-controls {
    display: flex;
    align-items: center;
    gap: 16px;
}

.pagination-page-info {
    font-size: 14px;
    font-weight: 500;
    color: hsl(240 5% 64.9%);
    white-space: nowrap;
}

.pagination-list {
    display: flex;
    align-items: center;
    gap: 4px;

    button {
        background-color: transparent;
    }
}

.pagination-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border: 1px solid hsl(240 3.7% 25%);
    border-radius: 6px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    &:hover {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
        border-color: hsl(240 5% 64.9%);
    }

    &:focus {
        box-shadow: 0 0 0 2px hsl(0 0% 98%);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }

    &:first-of-type {
        transform: rotate(180deg);
    }

    &:nth-of-type(2) {
        transform: rotate(180deg);
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

.pagination-button-nav {
    min-width: 32px;
    padding: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .pagination-wrapper {
        flex-direction: column;
        gap: 12px;
        align-items: stretch;
    }

    .pagination-controls {
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
    }

    .pagination-page-info {
        order: -1;
        width: 100%;
        text-align: center;
    }
}
</style>
