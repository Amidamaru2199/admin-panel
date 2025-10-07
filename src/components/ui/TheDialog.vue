<template>
    <DialogRoot v-model:open="isOpen">
        <DialogTrigger as-child>
            <slot name="trigger" />
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay class="dialog-overlay" />
            <DialogContent class="dialog-content">
                <DialogTitle class="dialog-title">
                    <slot name="title" />
                </DialogTitle>
                <DialogDescription class="dialog-description">
                    <slot name="description" />
                </DialogDescription>

                <div class="dialog-body">
                    <slot name="body" />
                </div>

                <div class="dialog-footer">
                    <slot name="footer" />
                </div>

                <DialogClose class="dialog-close">
                    <slot name="close">
                        <TheClose />
                    </slot>
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<script setup>
import { ref } from 'vue'
import TheClose from '@/components/icons/TheClose.vue'

const isOpen = ref(false)

defineExpose({
    isOpen
})
</script>

<style lang="scss">
.dialog-overlay {
    position: fixed;
    inset: 0;
    background-color: #000000cc;
}

.dialog-content {
    display: grid;
    gap: 16px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 512px;
    padding: 24px;
    border-width: 1px;
    border-radius: 8px;
    background-color: hsl(240 10% 3.9%);
}

.dialog-title {
    margin: 0;
    font-size: 18px;
    line-height: 1;
    font-weight: 600;
    color: $primary-color;
}

.dialog-description {
    margin: 0 0 8px;
    font-size: 14px;
    color: hsl(240 5% 64.9%);
}

.dialog-body {
    display: grid;
    gap: 16px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
}

.dialog-close {
    position: absolute;
    top: 24px;
    right: 24px;
    padding: 0;
    background: transparent;
    color: hsl(240 5% 64.9%);

    &:hover {
        color: $primary-color;
    }

    svg {
        width: 16px;
        height: 16px;
    }
}
</style>
