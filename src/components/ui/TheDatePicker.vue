<template>
    <div class="date-picker-wrapper">
        <label v-if="label" class="date-picker-label" :for="id">{{ label }}</label>
        <DatePickerRoot :id="id" :is-date-unavailable="isDateUnavailable" :locale="'ru'"
            @update:model-value="handleDateChange">
            <DatePickerField v-slot="{ segments }" class="date-picker-field">
                <div class="date-picker-input">
                    <template v-for="item in segments" :key="item.part">
                        <DatePickerInput v-if="item.part === 'literal'" :part="item.part">
                            {{ item.value }}
                        </DatePickerInput>
                        <DatePickerInput v-else :part="item.part" class="date-picker-segment">
                            {{ item.value }}
                        </DatePickerInput>
                    </template>
                </div>

                <DatePickerTrigger class="date-picker-trigger">
                    <ThePicker />
                </DatePickerTrigger>
            </DatePickerField>

            <DatePickerContent :side-offset="4" class="date-picker-content">
                <DatePickerArrow class="date-picker-arrow" />
                <DatePickerCalendar v-slot="{ weekDays, grid }" class="date-picker-calendar">
                    <DatePickerHeader class="date-picker-header">
                        <DatePickerPrev class="date-picker-nav-button date-picker-nav-button_prev">
                            <ThePaginatorArrow />
                        </DatePickerPrev>
                        <DatePickerHeading class="date-picker-heading" />
                        <DatePickerNext class="date-picker-nav-button">
                            <ThePaginatorArrow />
                        </DatePickerNext>
                    </DatePickerHeader>

                    <div class="date-picker-grid-container">
                        <DatePickerGrid v-for="month in grid" :key="month.value.toString()" class="date-picker-grid">
                            <DatePickerGridHead>
                                <DatePickerGridRow class="date-picker-weekdays">
                                    <DatePickerHeadCell v-for="day in weekDays" :key="day" class="date-picker-weekday">
                                        {{ day }}
                                    </DatePickerHeadCell>
                                </DatePickerGridRow>
                            </DatePickerGridHead>
                            <DatePickerGridBody>
                                <DatePickerGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`"
                                    class="date-picker-week">
                                    <DatePickerCell v-for="weekDate in weekDates" :key="weekDate.toString()"
                                        :date="weekDate">
                                        <DatePickerCellTrigger :day="weekDate" :month="month.value"
                                            class="date-picker-day" />
                                    </DatePickerCell>
                                </DatePickerGridRow>
                            </DatePickerGridBody>
                        </DatePickerGrid>
                    </div>
                </DatePickerCalendar>
            </DatePickerContent>
        </DatePickerRoot>
    </div>
</template>

<script setup>
import ThePicker from '@/components/icons/ThePicker.vue'
// :is-date-unavailable="(date) => date.day === 19" для отключения дней, чтобы число стало дисабельным
const props = defineProps({
    id: {
        type: String,
        default: 'date-picker'
    },
    label: {
        type: String,
        default: ''
    },
    isDateUnavailable: {
        type: Function,
        default: () => false
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue'])

// Функция для форматирования даты в YYYY-MM-DD
const formatDate = (date) => {
    if (!date) return ''

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

// Обработчик изменения даты
const handleDateChange = (date) => {
    let formattedDate = ''

    if (date && typeof date.toString === 'function') {
        // Преобразуем в строку и затем в Date
        const dateString = date.toString()
        const parsedDate = new Date(dateString)
        if (!isNaN(parsedDate.getTime())) {
            formattedDate = formatDate(parsedDate)
        }
    }

    emit('update:modelValue', formattedDate)
}
</script>

<style lang="scss">
.date-picker-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.date-picker-label {
    font-size: 14px;
    font-weight: 500;
    color: $primary-color;
    margin-bottom: 0;
}

.date-picker-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 12px;
    border: 1px solid $secondary-color;
    border-radius: 6px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: $primary-color;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: hsl(240 5% 64.9%);
    }

    &:focus-within {
        border-color: $primary-color;
    }

    &[data-invalid] {
        border-color: $error-color;
    }
}

.date-picker-input {
    display: flex;
    align-items: center;
    flex: 1;
}

.date-picker-segment {
    padding: 0 2px;
    border-radius: 4px;
    outline: none;
    background-color: transparent;
    color: $primary-color;
    font-size: 14px;
    font-weight: 500;

    &:focus {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
        box-shadow: 0 0 0 2px $primary-color;
    }

    &[data-placeholder] {
        color: hsl(240 5% 64.9%);
    }
}

.date-picker-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: transparent;
    color: hsl(240 5% 64.9%);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
        color: $primary-color;
    }

    &:focus {
        box-shadow: 0 0 0 2px $primary-color;
    }

    svg {
        width: 16px;
        height: 16px;
        color: hsl(240, 5%, 64.9%);
    }
}

.date-picker-content {
    background-color: hsl(240 10% 3.9%);
    border: 1px solid $secondary-color;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    overflow: hidden;
}

.date-picker-arrow {
    fill: hsl(240 10% 3.9%);
}

.date-picker-calendar {
    padding: 16px;
}

.date-picker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.date-picker-nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    background-color: transparent;
    color: hsl(240 5% 64.9%);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
        color: $primary-color;
    }

    &:focus {
        box-shadow: 0 0 0 2px $primary-color;
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

.date-picker-nav-button_prev {
    transform: rotate(180deg);
}

.date-picker-heading {
    font-size: 16px;
    font-weight: 600;
    color: $primary-color;
}

.date-picker-grid-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.date-picker-grid {
    width: 100%;
    border-collapse: collapse;
}

.date-picker-weekdays {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 4px;
}

.date-picker-weekday {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    color: hsl(240 5% 64.9%);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.date-picker-week {
    display: flex;
    width: 100%;
}

.date-picker-day {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid transparent;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: $primary-color;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;

    &:hover {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
        border-color: hsl(240 5% 64.9%);
    }

    &:focus {
        box-shadow: 0 0 0 2px $primary-color;
    }

    &[data-selected] {
        background-color: $primary-color;
        color: hsl(240 5.9% 10%);
        font-weight: 600;
    }

    &[data-today] {
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 2px;
            right: 2px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: $primary-color;
        }
    }

    &[data-today][data-selected]::before {
        background-color: hsl(240 5.9% 10%);
    }

    &[data-outside-view] {
        color: hsl(240 5% 64.9%);
    }

    &[data-unavailable] {
        color: hsl(240 5% 64.9%);
        text-decoration: line-through;
        cursor: not-allowed;
        pointer-events: none;
    }
}

/* Анимации */
.date-picker-content[data-side="top"] {
    animation: slideDownAndFade 0.2s ease-out;
}

.date-picker-content[data-side="right"] {
    animation: slideLeftAndFade 0.2s ease-out;
}

.date-picker-content[data-side="bottom"] {
    animation: slideUpAndFade 0.2s ease-out;
}

.date-picker-content[data-side="left"] {
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
