<template>
  <div class="servers">
    <div class="servers__header">
      <div class="servers__header-text">
        <h1 class="servers__title">Сервера</h1>
        <span class="servers__subtitle">Управление VPN серверами </span>
      </div>
      <div class="servers__switcher-wr">
        <TheSwitcher v-model="switchState" />
        <TheOko v-if="switchState" />
        <TheOkoLine v-else />
      </div>

      <button class="servers__header-button">Получить куки для серверов</button>

      <AddServerDialog>
        <template #trigger>
          <div class="servers__header-button servers__header-button_add">
            <TheCross />Добавить сервер
          </div>
        </template>
      </AddServerDialog>
    </div>

    <div class="servers__table-wr">
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
          <tr>
            <td>1</td>
            <td>
              <div>
                <img src="https://flagcdn.com/40x30/nl.png" alt="flag" />
                Амстердам
                <span>(NL)</span>
              </div>
            </td>
            <td>Нидерланды</td>
            <td>213.108.21.188</td>
            <td>Высокий пинг. Только если вам нужны именно США</td>
            <td>Забит</td>
            <td>
              <TheSucsess />
            </td>
            <td>
              <TheSucsess />
            </td>
            <td>20</td>
            <td>281</td>
            <td>
              <div>
                <AddServerDialog>
                  <template #trigger>
                    <TheFile />
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
import { ref } from 'vue'
import AddServerDialog from '@/components/AddServerDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import TheOkoLine from '@/components/icons/TheOkoLine.vue'
import TheOko from '@/components/icons/TheOko.vue'
import TheCross from '@/components/icons/TheCross.vue'
import TheSucsess from '@/components/icons/TheSucsess.vue'
import TheLink from '@/components/icons/TheLink.vue'

const switchState = ref(false)
</script>

<style lang="scss">
.servers {
  padding: 24px;
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;

  &__header {
    display: flex;
    align-items: center;
  }

  &__title {
    margin: 0 0 12px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
    color: hsl(0 0% 98%);
  }

  &__subtitle {
    font-size: 14px;
    color: hsl(240 5% 64.9%);
  }

  &__switcher-wr {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 8px 0 auto;

    svg {
      color: hsl(0 0% 98%);
    }
  }

  &__header-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    margin-inline: 8px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    background-color: transparent;
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);

    &_add {
      margin-right: 0;
      color: hsl(240 5.9% 10%);
      background-color: hsl(0 0% 98%);

      svg {
        color: hsl(240 5.9% 10%);
      }
    }
  }

  &__table-wr {
    margin-top: 24px;
    border: 1px solid hsl(240 3.7% 15.9%);
    border-radius: 6px;

    table {
      width: 100%;
      text-indent: 0;
      border-color: inherit;
      border-collapse: collapse;

      tr {
        border-bottom: 1px solid hsl(240 3.7% 15.9%);

        &:hover {
          background-color: hsl(240deg 3.7% 15.9% / 50%);
        }
      }

      th {
        height: 48px;
        padding: 1px 16px;
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: hsl(240 5% 64.9%);
      }

      tbody {
        tr {
          &:last-of-type {
            border: none;
          }
        }
      }

      td {
        padding: 15px 16px;
        text-align: left;
        font-size: 14px;
        color: hsl(0 0% 98%);

        div {
          display: flex;
          align-items: center;
          gap: 8px;

          span {
            font-size: 12px;
            color: hsl(240 5% 64.9%);
          }
        }

        img {
          width: 20px;
          height: 15px;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
