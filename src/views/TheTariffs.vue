<template>
  <div class="tariffs block">
    <div class="block__header">
      <div class="block__header-text">
        <h1 class="block__title">Тарифы</h1>
        <span class="block__subtitle">Управление тарифами</span>
      </div>
      <div class="block__switcher-wr">
        <TheSwitcher v-model="switchState" />
        <TheOko v-if="switchState" />
        <TheOkoLine v-else />
      </div>

      <CreateTarifDialog>
        <template #trigger>
          <div class="block__header-button block__header-button_add block__dialog-trigger">
            <TheCross />Добавить тариф
          </div>
        </template>
      </CreateTarifDialog>
    </div>

    <div class="block__table-wr">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Кол-во дней</th>
            <th>Активный</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>На 6 месяцев</td>
            <td></td>
            <td>519</td>
            <td>180</td>
            <td>
              <TheSucsess />
            </td>
            <td>
              <DropdownMenuRoot>
                <DropdownMenuTrigger>
                  <button>...</button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuContent class="tariffs__dropdown-content" align="end">
                    <CreateTarifDialog>
                      <template #trigger>
                        <div class="tariffs__dropdown-item">Редактировать</div>
                      </template>
                    </CreateTarifDialog>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenuRoot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreateTarifDialog from '@/components/CreateTarifDialog.vue'
const switchState = ref(false)
</script>

<style lang="scss">
.tariffs {
  &__dialog-trigger {
    cursor: pointer;
  }

  &__dropdown-content {
    min-width: 120px;
    padding: 4px;
    background-color: hsl(240 10% 3.9%);
    border: 1px solid hsl(240 3.7% 25%);
    border-radius: 8px;
    z-index: 50;

    hr {
      height: 1px;
      margin: 4px -4px;
      border: none;
      background-color: hsl(240 3.7% 15.9%);
    }
  }

  &__dropdown-item {
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: hsl(0 0% 98%);

    &:hover {
      background-color: hsl(240deg 3.7% 25%);
    }
  }
}
</style>
