<template>
  <TheDialog>
    <template #trigger>
      <slot name="trigger" />
    </template>

    <template #title>Создать тариф</template>

    <template #description>Заполните информацию о новом тарифе</template>

    <template #body>
      <div class="tarif__dialog-grid">
        <div class="tarif__dialog-group">
          <div class="tarif__dialog-grid-item">
            <label for="">Название</label>
            <input type="text" />
          </div>
          <div class="tarif__dialog-grid-item">
            <label for="">Описание</label>
            <input type="text" />
          </div>
          <div class="tarif__dialog-grid-item">
            <label for="">Цена</label>
            <input type="text" />
          </div>

          <NumberFieldRoot class="tarif__dialog-grid-item">
            <NumberFieldDecrement class="tarif__dialog-decrement">
              <TheMinus />
            </NumberFieldDecrement>
            <label for="">Дни</label>
            <NumberFieldInput />
            <NumberFieldIncrement class="tarif__dialog-increment">
              <ThePlus />
            </NumberFieldIncrement>
          </NumberFieldRoot>

          <div class="tarif__dialog-grid-item">
            <label for="">Публичный ключ</label>
            <input type="text" />
          </div>
          <div class="tarif__dialog-grid-item tarif__dialog-grid-item_switcher">
            <span>Скрыт</span>
            <TheSwitcher v-model="switchState" />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <button class="tarif__dialog-save-button">Отмена</button>
      <button class="tarif__dialog-save-button">Сохранить</button>
    </template>
  </TheDialog>
</template>

<script setup>
import { ref } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'

const switchState = ref(false)
</script>

<style lang="scss">
.tarif__dialog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.tarif__dialog-group {
  display: grid;
  align-content: flex-start;
  gap: 12px;
}

.tarif__dialog-increment,
.tarif__dialog-decrement {
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 12px;
  width: 20px;
  height: 10px;
}

.tarif__dialog-increment {
  bottom: 22px;
}

.tarif__dialog-decrement {
  bottom: 10px;
}

.tarif__dialog-grid-item {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  gap: 16px;
  position: relative;

  &:hover {
    .tarif__dialog-increment,
    .tarif__dialog-decrement {
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
    color: hsl(0 0% 98%);

    &:focus {
      border: 1px solid hsl(0 0% 98%);
    }
  }
}

.tarif__dialog-save-button {
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
