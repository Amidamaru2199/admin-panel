<template>
  <div class="users block">
    <div class="block__header">
      <div class="block__header-text">
        <h1 class="block__title">Пользователи</h1>
        <span class="block__subtitle">Управление пользователями</span>
      </div>

      <FilterDialog>
        <template #trigger>
          <div class="block__header-button block__dialog-trigger">Фильтр</div>
        </template>
      </FilterDialog>

      <GroupTimeDialog>
        <template #trigger>
          <div class="block__header-button block__header-button_add block__dialog-trigger">
            <TheCross /> Добавить время группе
          </div>
        </template>
      </GroupTimeDialog>
    </div>

    <div class="block__table-wr">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Юзернейм</th>
            <th>TGid</th>
            <th>Статус</th>
            <th>Тариф</th>
            <th>Сервер</th>
            <th>Подписка до</th>
            <th>Зарегистрирован</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in 10" :key="index">
            <td>26115</td>
            <td>Андрей</td>
            <td>@BigBoaKaa</td>
            <td>492526355</td>
            <td>Активный</td>
            <td>На 6 месяцев</td>
            <td>Стокгольм</td>
            <td>15/12/25, 15:04</td>
            <td>13/06/25, 15:04</td>
            <td>
              <DropdownMenuRoot>
                <DropdownMenuTrigger>
                  <button>...</button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuContent class="tariffs__dropdown-content" align="end">
                    <AddTimeDialog>
                      <template #trigger>
                        <div class="tariffs__dropdown-item">Добаить время</div>
                      </template>
                    </AddTimeDialog>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenuRoot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ThePagination :total-items="37659" :items-per-page="20" :current-page="currentPage"
      @update:current-page="handlePageChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddTimeDialog from '@/components/AddTimeDialog.vue'
import FilterDialog from '@/components/FilterDialog.vue'
import GroupTimeDialog from '@/components/GroupTimeDialog.vue'
import ThePagination from '@/components/ui/ThePagination.vue'

const currentPage = ref(1)

const handlePageChange = (page) => {
  currentPage.value = page
  // Здесь можно добавить логику загрузки данных для новой страницы
  console.log('Переход на страницу:', page)
}
</script>

<style lang="scss">
.users {
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

  tr {
    th:first-of-type {
      width: 1%;
    }

    td:first-of-type {
      width: 1%;
    }
  }
}
</style>
