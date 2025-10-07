<template>
    <TheDialog>
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #title>Добавить время группе</template>

        <template #description>Выбери каким пользователям добавить время</template>

        <template #body>
            <div class="servers__dialog-grid-item">
                <input placeholder="Количетво дней" type="text" />
            </div>
            <TheSelect v-model="tarif" placeholder="Тариф" aria-label="Тариф" :options="tarifOptions" />
            <TheSelect v-model="server" placeholder="Сервер" aria-label="Сервер" :options="serverOptions" />

            <div class="servers__dialog-grid">
                <div class="servers__dialog-group">
                    <div class="servers__dialog-grid-item">
                        <input placeholder="TGid" type="text" />
                    </div>
                    <TheDatePicker id="date-start-field" label="Дата регистрации"
                        :is-date-unavailable="date => date.day === 19" />
                    <TheDatePicker id="date-end-field" label="Дата окончания подписки"
                        :is-date-unavailable="date => date.day === 19" />
                </div>
                <div class="servers__dialog-group">
                    <div class="servers__dialog-grid-item">
                        <input placeholder="Юзернейм" type="text" />
                    </div>
                    <TheDatePicker id="date-start-field" label="&nbsp;"
                        :is-date-unavailable="date => date.day === 19" />
                    <TheDatePicker id="date-end-field" label="&nbsp;" :is-date-unavailable="date => date.day === 19" />
                </div>
            </div>
        </template>

        <template #footer>
            <button class="filter__dialog-save-button">Сбросить фильтры</button>
            <button class="filter__dialog-save-button">Фильтровать</button>
        </template>
    </TheDialog>
</template>

<script setup>
import { ref } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import TheSelect from '@/components/ui/TheSelect.vue'
import TheDatePicker from '@/components/ui/TheDatePicker.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'

const tarif = ref('')
const server = ref('')

const tarifOptions = ['На 1 месяц', 'На 2 месяца', 'На 3 месяца']
const serverOptions = [
    'Алматы',
    'Москва',
    'Лондон',
    'Нью-Йорк',
    'Токио',
    'Париж',
    'Берлин',
    'Сидней',
    'Дубай',
    'Сингапур',
]

const switchState = ref(false)
</script>

<style lang="scss">
.filter__dialog-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
}

.filter__dialog-group {
    display: grid;
    align-content: flex-start;
    gap: 12px;
}

.filter__dialog-increment,
.filter__dialog-decrement {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 12px;
    width: 20px;
    height: 10px;
}

.filter__dialog-increment {
    bottom: 22px;
}

.filter__dialog-decrement {
    bottom: 10px;
}

.filter__dialog-grid-item {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    gap: 16px;
    position: relative;

    &:hover {

        .filter__dialog-increment,
        .filter__dialog-decrement {
            display: flex;
        }
    }

    span,
    label {
        margin: 0 0 8px;
        font-size: 14px;
        line-height: 1;
        font-weight: 500;
        color: $primary-color;
        text-align: right;
    }

    span {
        margin: 0;
    }

    input {
        grid-column: span 4;
        height: 40px;
        padding-inline: 12px;
        border-width: 1px;
        border-radius: 6px;
        outline: none;
        background-color: transparent;
        font-size: 14px;
        line-height: 1;
        font-weight: 500;
        color: $primary-color;

        &:focus {
            border: 1px solid $primary-color;
        }
    }
}

.filter__dialog-save-button {
    height: 40px;
    padding-inline: 16px;
    border-radius: 6px;
    color: $background-color;
    background-color: $primary-color;

    &:hover {
        background-color: hsl(240 5% 64.9%);
    }
}
</style>