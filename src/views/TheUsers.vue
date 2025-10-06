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
          <tr v-if="usersStore.isLoading">
            <td colspan="10" class="users__loading">
              Загрузка пользователей...
            </td>
          </tr>
          <tr v-else-if="usersStore.error">
            <td colspan="10" class="users__error">
              Ошибка загрузки: {{ usersStore.error.message }}
            </td>
          </tr>
          <tr v-else-if="!usersStore.allUsers || usersStore.allUsers.length === 0">
            <td colspan="10" class="users__empty">
              Пользователи не найдены
            </td>
          </tr>
          <tr v-else v-for="user in usersStore.allUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.username ? '@' + user.username : '' }}</td>
            <td>{{ user.tg_id }}</td>
            <td>
              <span :class="{ 'users__status-active': user.is_active, 'users__status-inactive': !user.is_active }">
                {{ user.is_active ? 'Активный' : 'Неактивный' }}
              </span>
            </td>
            <td>{{ user.tariff_id }}</td>
            <td>{{ user.server_id }}</td>
            <td>{{ formatDate(user.subscription) }}</td>
            <td>{{ formatDate(user.registered_at) }}</td>
            <td>
              <DropdownMenuRoot>
                <DropdownMenuTrigger>
                  <button>...</button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuContent class="users__dropdown-content" align="end">
                    <AddTimeDialog :tg-id="user.tg_id">
                      <template #trigger>
                        <div class="users__dropdown-item">Добавить время</div>
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
    <ThePagination :total-items="usersStore.usersPagination.totalItems"
      :items-per-page="usersStore.usersPagination.itemsPerPage" :current-page="currentPage"
      @update:current-page="handlePageChange" />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import AddTimeDialog from '@/components/AddTimeDialog.vue'
import FilterDialog from '@/components/FilterDialog.vue'
import GroupTimeDialog from '@/components/GroupTimeDialog.vue'
import ThePagination from '@/components/ui/ThePagination.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()

// Computed свойство для текущей страницы
const currentPage = computed(() => {
  return usersStore.usersPagination.currentPage
})

// Обработчик изменения страницы
const handlePageChange = (page) => {
  usersStore.goToUsersPage(page)
}

// Загрузка пользователей при монтировании компонента
onMounted(async () => {
  await usersStore.fetchAllUsers()
})

// Watcher для автоматической загрузки при изменении фильтров
watch(() => usersStore.usersFilters, async () => {
  await usersStore.fetchAllUsers()
}, { deep: true })

// Функция для форматирования дат
const formatDate = (dateString) => {
  if (!dateString) return 'Не указано'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    return 'Неверная дата'
  }
}
</script>

<style lang="scss">
.users {
  &__dialog-trigger {
    cursor: pointer;
  }

  &__loading,
  &__error,
  &__empty {
    text-align: center;
    padding: 20px;
    color: hsl(0 0% 64.9%);
    font-style: italic;
  }

  &__error {
    color: hsl(0 62.8% 30.6%);
  }

  &__status-active {
    color: hsl(142 76% 36%);
    font-weight: 500;
  }

  &__status-inactive {
    color: hsl(0 62.8% 30.6%);
    font-weight: 500;
  }

  &__dropdown-trigger {
    background: none;
    border: none;
    color: hsl(0 0% 98%);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
      background-color: hsl(240deg 3.7% 25%);
    }
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
