<template>
  <TheDialog>
    <template #trigger>
      <slot name="trigger" />
    </template>

    <template #title>Добавление времени</template>

    <template #description>Укажите сколько дней вы хотите добавить</template>

    <template #body>
      <div class="time__dialog-grid">
        <div class="time__dialog-group">
          <div class="time__dialog-grid-item">
            <input type="text" />
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <button class="time__dialog-save-button">Добавить</button>
    </template>
  </TheDialog>
</template>

<script setup>
import TheDialog from '@/components/ui/TheDialog.vue'
</script>

<style lang="scss" scoped>
.time__dialog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

.time__dialog-group {
  display: grid;
  align-content: flex-start;
  gap: 12px;
}

.time__dialog-grid-item {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  gap: 16px;
  position: relative;

  &:hover {
    .time__dialog-increment,
    .time__dialog-decrement {
      display: flex;
    }
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

.time__dialog-save-button {
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
