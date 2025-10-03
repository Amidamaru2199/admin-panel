<template>
    <div class="date-picker-wrapper">
        <label v-if="label" class="date-picker-label" :for="id">{{ label }}</label>
        <DatePickerRoot :id="id" :is-date-unavailable="isDateUnavailable">
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
                    <Icon icon="radix-icons:calendar" />
                </DatePickerTrigger>
            </DatePickerField>

            <DatePickerContent :side-offset="4" class="date-picker-content">
                <DatePickerArrow class="date-picker-arrow" />
                <DatePickerCalendar v-slot="{ weekDays, grid }" class="date-picker-calendar">
                    <DatePickerHeader class="date-picker-header">
                        <DatePickerPrev class="date-picker-nav-button">
                            <Icon icon="radix-icons:chevron-left" />
                        </DatePickerPrev>

                        <DatePickerHeading class="date-picker-heading" />
                        <DatePickerNext class="date-picker-nav-button">
                            <Icon icon="radix-icons:chevron-right" />
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
import { computed } from 'vue'

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
    }
})
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
    color: hsl(0 0% 98%);
    margin-bottom: 0;
}

.date-picker-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 12px;
    border: 1px solid hsl(240 3.7% 25%);
    border-radius: 6px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: hsl(240 5% 64.9%);
    }

    &:focus-within {
        border-color: hsl(0 0% 98%);
    }

    &[data-invalid] {
        border-color: hsl(0 62.8% 30.6%);
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
    color: hsl(0 0% 98%);
    font-size: 14px;
    font-weight: 500;

    &:focus {
        background-color: hsl(240deg 3.7% 15.9% / 50%);
        box-shadow: 0 0 0 2px hsl(0 0% 98%);
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
        color: hsl(0 0% 98%);
    }

    &:focus {
        box-shadow: 0 0 0 2px hsl(0 0% 98%);
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

.date-picker-content {
    background-color: hsl(240 10% 3.9%);
    border: 1px solid hsl(240 3.7% 25%);
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
        color: hsl(0 0% 98%);
    }

    &:focus {
        box-shadow: 0 0 0 2px hsl(0 0% 98%);
    }

    svg {
        width: 16px;
        height: 16px;
    }
}

.date-picker-heading {
    font-size: 16px;
    font-weight: 600;
    color: hsl(0 0% 98%);
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

    &[data-selected] {
        background-color: hsl(0 0% 98%);
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
            background-color: hsl(0 0% 98%);
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
