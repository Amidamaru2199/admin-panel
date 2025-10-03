<template>
    <TheDialog>
        <template #trigger>
            <slot name="trigger" />
        </template>

        <template #title>
            Добавление сервера
        </template>

        <template #description>
            Укажите данные сервера
        </template>

        <template #body>
            <div class="servers__dialog-grid">
                <div class="servers__dialog-group">
                    <div class="servers__dialog-grid-item">
                        <label for="">Название</label>
                        <input placeholder="Название" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">Страна</label>
                        <input placeholder="Страна" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">Код</label>
                        <input placeholder="Код" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">IP адрес</label>
                        <input placeholder="IP адрес" type="text" />
                    </div>

                    <NumberFieldRoot class="servers__dialog-grid-item">
                        <NumberFieldDecrement class="servers__dialog-decrement">
                            <TheMinus />
                        </NumberFieldDecrement>
                        <label for="">VLESS Inbound ID</label>
                        <NumberFieldInput />
                        <NumberFieldIncrement class="servers__dialog-increment">
                            <ThePlus />
                        </NumberFieldIncrement>
                    </NumberFieldRoot>

                    <div class="servers__dialog-grid-item">
                        <label for="">Публичный ключ</label>
                        <input placeholder="Публичный ключ" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item servers__dialog-grid-item_switcher">
                        <TheSwitcher v-model="switchState" />
                        <span>Активный</span>
                    </div>
                </div>
                <div class="servers__dialog-group">
                    <div class="servers__dialog-grid-item">
                        <label for="">Порт панели</label>
                        <input placeholder="Порт панели" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">URL путь к панели</label>
                        <input placeholder="URL путь к панели" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">Пароль к панели</label>
                        <input placeholder="Пароль к панели" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">Порт inbound</label>
                        <input placeholder="Порт inbound" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">Короткий ID</label>
                        <input placeholder="Короткий ID" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item">
                        <label for="">Вес</label>
                        <input placeholder="Вес" type="text" />
                    </div>
                    <div class="servers__dialog-grid-item servers__dialog-grid-item_switcher">
                        <TheSwitcher v-model="switchState" />
                        <span>Искл. из распределения</span>
                    </div>
                </div>
            </div>
            <div class="servers__dialog-grid-item">
                <label for="">Описание</label>
                <input placeholder="Описание" type="text" />
            </div>
            <div class="servers__dialog-grid-item">
                <label for="">Инфо (не видно пользователям)</label>
                <input placeholder="Инфо" type="text" />
            </div>
        </template>

        <template #footer>
            <button class="servers__dialog-save-button">Сохранить</button>
        </template>
    </TheDialog>
</template>

<script setup>
import { ref } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import TheMinus from '@/components/icons/TheMinus.vue'
import ThePlus from '@/components/icons/ThePlus.vue'

const switchState = ref(false)
</script>

<style lang="scss" scoped>
.servers__dialog-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.servers__dialog-group {
    display: grid;
    align-content: flex-start;
    gap: 12px;
}

.servers__dialog-increment,
.servers__dialog-decrement {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 12px;
    width: 20px;
    height: 10px;
}

.servers__dialog-increment {
    bottom: 22px;
}

.servers__dialog-decrement {
    bottom: 10px;
}

.servers__dialog-grid-item {
    display: flex;
    flex-direction: column;
    position: relative;

    &_switcher {
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }

    &:hover {

        .servers__dialog-increment,
        .servers__dialog-decrement {
            display: flex;
        }
    }

    span,
    label {
        margin: 0 0 8px;
        font-size: 14px;
        line-height: 1;
        font-weight: 500;
        color: hsl(0 0% 98%);
    }

    span {
        margin: 0;
    }

    input {
        height: 40px;
        padding-inline: 12px;
        border-width: 1px;
        border-radius: 6px;
        outline: none;
        background-color: transparent;
        font-size: 14px;
        line-height: 1;
        font-weight: 500;
        color: hsl(0 0% 98%);

        &:focus {
            border: 1px solid hsl(0 0% 98%);
        }
    }
}

.servers__dialog-save-button {
    height: 40px;
    padding-inline: 16px;
    border-radius: 6px;
    color: hsl(240 5.9% 10%);
    background-color: hsl(0 0% 98%);

    &:hover {
        background-color: hsl(240 5% 64.9%);
    }
}
</style>
