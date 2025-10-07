<template>
    <SelectRoot v-model="selectedValue">
        <SelectTrigger class="select-trigger" :aria-label="ariaLabel">
            <SelectValue :placeholder="placeholder" />
            <TheSelectArrow />
        </SelectTrigger>

        <SelectPortal>
            <SelectContent class="select-content" :side="side" :align="align" :side-offset="sideOffset"
                :align-offset="alignOffset" :avoid-collisions="avoidCollisions" :sticky="sticky">
                <!-- <SelectScrollUpButton class="select-scroll-button">
                    <TheSelectArrow />
                </SelectScrollUpButton> -->

                <SelectViewport class="select-viewport">
                    <SelectLabel v-if="label" class="select-label">
                        {{ label }}
                    </SelectLabel>
                    <SelectGroup>
                        <SelectItem v-for="(option, index) in options" :key="index" class="select-item"
                            :value="option.value || option" :disabled="option.disabled">
                            <!-- <SelectItemIndicator class="select-item-indicator">
                                <Icon icon="radix-icons:check" />
                            </SelectItemIndicator> -->
                            <SelectItemText>
                                {{ option.label || option }}
                            </SelectItemText>
                        </SelectItem>
                    </SelectGroup>
                </SelectViewport>

                <!-- <SelectScrollDownButton class="select-scroll-button">
                    <Icon icon="radix-icons:chevron-down" />
                </SelectScrollDownButton> -->
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>

<script setup>
import { ref, watch } from 'vue'
import TheSelectArrow from '../icons/TheSelectArrow.vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: 'Выберите опцию...',
    },
    ariaLabel: {
        type: String,
        default: 'Select options',
    },
    label: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
    side: {
        type: String,
        default: 'bottom',
        validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value),
    },
    align: {
        type: String,
        default: 'start',
        validator: (value) => ['start', 'center', 'end'].includes(value),
    },
    sideOffset: {
        type: Number,
        default: 5,
    },
    alignOffset: {
        type: Number,
        default: 0,
    },
    avoidCollisions: {
        type: Boolean,
        default: true,
    },
    sticky: {
        type: String,
        default: 'partial',
        validator: (value) => ['partial', 'always'].includes(value),
    },
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref(props.modelValue)


watch(selectedValue, (newValue) => {
    emit('update:modelValue', newValue)
})

watch(
    () => props.modelValue,
    (newValue) => {
        selectedValue.value = newValue
    },
)
</script>

<style lang="scss">
/* Select Trigger - стилизуем как инпут */
.select-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    min-width: 160px;
    height: 40px;
    padding: 0 12px;
    border: 1px solid $secondary-color;
    border-radius: 6px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: $primary-color;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: hsl(240 5% 64.9%);
    }

    &:focus {
        border-color: $primary-color;
    }

    &[data-placeholder] {
        color: hsl(240 5% 64.9%);
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

.select-chevron {
    width: 14px;
    height: 14px;
    color: hsl(240 5% 64.9%);
    transition: transform 0.2s ease;
}

.select-trigger[data-state='open'] .select-chevron {
    transform: rotate(180deg);
}

/* Select Content - выпадающий список */
.select-content {
    min-width: 160px;
    background-color: hsl(240 10% 3.9%);
    border: 1px solid $secondary-color;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    overflow: hidden;
}

.select-viewport {
    padding: 4px;
}

.select-scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    background-color: hsl(240 10% 3.9%);
    color: hsl(240 5% 64.9%);
    cursor: pointer;
    border: none;
    outline: none;

    &:hover {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
    }
}

.select-label {
    padding: 8px 12px 4px;
    font-size: 12px;
    font-weight: 500;
    color: hsl(240 5% 64.9%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.select-item {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 12px 0 32px;
    font-size: 14px;
    font-weight: 500;
    color: $primary-color;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    outline: none;
    transition: background-color 0.2s ease;

    &[data-disabled] {
        color: hsl(240 5% 64.9%);
        cursor: not-allowed;
    }

    &[data-highlighted] {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
    }

    &:hover:not([data-disabled]) {
        background-color: hsl(240deg 3.7% 15.9% / 30%);
    }
}

.select-item-indicator {
    position: absolute;
    left: 8px;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary-color;
}

/* Анимации */
.select-content[data-side='top'] {
    animation: slideDownAndFade 0.2s ease-out;
}

.select-content[data-side='right'] {
    animation: slideLeftAndFade 0.2s ease-out;
}

.select-content[data-side='bottom'] {
    animation: slideUpAndFade 0.2s ease-out;
}

.select-content[data-side='left'] {
    animation: slideRightAndFade 0.2s ease-out;
}

@keyframes slideUpAndFade {
    from {
        opacity: 0;
        transform: translateY(2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideRightAndFade {
    from {
        opacity: 0;
        transform: translateX(-2px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideDownAndFade {
    from {
        opacity: 0;
        transform: translateY(-2px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideLeftAndFade {
    from {
        opacity: 0;
        transform: translateX(2px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
