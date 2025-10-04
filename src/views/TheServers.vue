<template>
  <div class="servers block">
    <div class="block__header">
      <div class="block__header-text">
        <h1 class="block__title">Сервера</h1>
        <span class="block__subtitle">Управление VPN серверами</span>
      </div>
      <div class="block__switcher-wr">
        <TheSwitcher v-model="switchState" />
        <TheOko v-if="switchState" />
        <TheOkoLine v-else />
      </div>

      <button @click="getServerCookies" class="block__header-button">Получить куки для серверов</button>

      <AddServerDialog>
        <template #trigger>
          <div class="block__header-button block__header-button_add block__dialog-trigger">
            <TheCross />Добавить сервер
          </div>
        </template>
      </AddServerDialog>
    </div>

    <div class="block__table-wr">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Страна</th>
            <th>IP адрес</th>
            <th>Описание</th>
            <th>Инфо</th>
            <th>Активен</th>
            <th>Распределение</th>
            <th>Вес</th>
            <th>Юзеров</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="el in usersStore.allServers" :key="el.id">
            <td>{{ el.id }}</td>
            <td>
              <div>
                <!--<img src="https://flagcdn.com/40x30/nl.png" alt="flag" />-->
                {{ el.name }}
                <span>({{ el.code }})</span>
              </div>
            </td>
            <td>{{ el.country }}</td>
            <td>{{ el.ip }}</td>
            <td>{{ el.description }}</td>
            <td>{{ el.info }}</td>
            <td>
              <TheSucsess v-if="el.is_active" />
              <TheBad v-else />
            </td>
            <td>
              <TheSucsess v-if="el.is_excluded" />
              <TheBad v-else />
            </td>
            <td>{{ el.weight }}</td>
            <td>{{ el.user_count }}</td>
            <td>
              <div>
                <AddServerDialog mode="edit" :server-data="el">
                  <template #trigger>
                    <TheFile class="servers__dialog-trigger" />
                  </template>
                </AddServerDialog>
                <TheLink />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddServerDialog from '@/components/AddServerDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import TheOkoLine from '@/components/icons/TheOkoLine.vue'
import TheOko from '@/components/icons/TheOko.vue'
import TheCross from '@/components/icons/TheCross.vue'
import TheSucsess from '@/components/icons/TheSucsess.vue'
import TheLink from '@/components/icons/TheLink.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()

const getServerCookies = async () => {
  await usersStore.fetchServerCookies()
}

onMounted(async () => {
  await usersStore.fetchAllServers()
})

const switchState = ref(false)
</script>

<style lang="scss">
.servers {
  &__dialog-trigger {
    cursor: pointer;
  }
}
</style>
