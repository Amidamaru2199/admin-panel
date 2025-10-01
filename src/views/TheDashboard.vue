<template>
  <div class="dashboard container">
    <div class="dashboard__top-containars">
      <div class="dashboard__top-containar">
        <span class="dashboard__top-containar-title">Всего юзеров</span>
        <span class="dashboard__top-containar-count">32835</span>
        <span class="dashboard__top-containar-summ">+26 за сегодня</span>
        <TheMens />
      </div>
      <div class="dashboard__top-containar">
        <span class="dashboard__top-containar-title">Платящих юзеров</span>
        <span class="dashboard__top-containar-count">5030</span>
        <span class="dashboard__top-containar-summ">Ориент. доход: 497970 ₽/мес.</span>
        <TheDollar />
      </div>
      <div class="dashboard__top-containar">
        <span class="dashboard__top-containar-title">С автоплатежами</span>
        <span class="dashboard__top-containar-count">4292</span>
        <TheCash />
      </div>
    </div>

    <div class="dashboard__tables">
      <div class="dashboard__first-table dashboard__table">
        <div class="dashboard__tables-info">
          <div class="dashboard__tables-info-text">
            <h3 class="dashboard__tables-info-title">Новые пользователи</h3>
            <span class="dashboard__tables-info-subtitle">Зарегистрированные сегодня</span>
          </div>
          <RouterLink class="dashboard__tables-info-link">
            Показать все
            <TheArrow />
          </RouterLink>
        </div>

        <div class="dashboard__table-wr">
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Юзернейм</th>
                <th>Статус</th>
                <th>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Екатерина</td>
                <td>
                  <div>
                    <span>-</span>
                  </div>
                </td>
                <td>
                  <div class="dashboard__table-status">Активный</div>
                </td>
                <td>01/10/25, 00:42</td>
              </tr>
              <tr>
                <td>Kris Dz.</td>
                <td>
                  <div>
                    <a class="dashboard__table-link" href="#">@kristina_dzabieva</a>
                  </div>
                </td>
                <td>
                  <div class="dashboard__table-status">Активный</div>
                </td>
                <td>01/10/25, 00:42</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="dashboard__last-table dashboard__table">
        <h3 class="dashboard__tables-info-title">Последние оплаты</h3>
        <div class="dashboard__tables-grid">
          <div class="dashboard__tables-grid-item">
            <span class="dashboard__tables-grid-item-text">01/10/25, 16:19</span>
            <span class="dashboard__tables-grid-item-text">На 2 месяца</span>
            <span class="dashboard__tables-grid-item-text">179.00 ₽</span>
          </div>
          <div class="dashboard__tables-grid-item">
            <span class="dashboard__tables-grid-item-text">01/10/25, 16:19</span>
            <span class="dashboard__tables-grid-item-text">На 1 месяц</span>
            <span class="dashboard__tables-grid-item-text">179.00 ₽</span>
          </div>
          <div class="dashboard__tables-grid-item">
            <span class="dashboard__tables-grid-item-text">01/10/25, 16:19</span>
            <span class="dashboard__tables-grid-item-text">На 2 месяца</span>
            <span class="dashboard__tables-grid-item-text">179.00 ₽</span>
          </div>
          <div class="dashboard__tables-grid-item">
            <span class="dashboard__tables-grid-item-text">01/10/25, 16:19</span>
            <span class="dashboard__tables-grid-item-text">На 2 месяца</span>
            <span class="dashboard__tables-grid-item-text">179.00 ₽</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheMens from '@/components/icons/TheMens.vue'
import TheDollar from '@/components/icons/TheDollar.vue'
import TheCash from '@/components/icons/TheCash.vue'
import TheArrow from '@/components/icons/TheArrow.vue'
</script>

<style scoped lang="scss">
.dashboard {
  &__top-containars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    padding-block: 32px;
  }
  &__top-containar {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 24px;
    border: 1px solid hsl(240 3.7% 15.9%);
    border-radius: 8px;

    svg {
      position: absolute;
      top: 24px;
      right: 24px;
      height: 16px;
      width: 16px;
    }
  }
  &__top-containar-title {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);
  }
  &__top-containar-count {
    margin-bottom: 4px;
    font-size: 24px;
    font-weight: 700;
    color: hsl(0 0% 98%);
  }
  &__top-containar-summ {
    font-size: 12px;
    color: hsl(240 5% 64.9%);
  }

  &__tables {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 32px;
  }
  &__table {
    padding: 24px;
    border: 1px solid hsl(240 3.7% 15.9%);
    border-radius: 8px;
  }
  &__first-table {
    grid-column: span 2;
  }
  &__tables-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  &__tables-info-text {
  }
  &__tables-info-title {
    margin: 0 0 5px;
    font-size: 24px;
    line-height: 1;
    font-weight: 600;
    color: hsl(0 0% 98%);
  }
  &__tables-info-subtitle {
    font-size: 14px;
    color: hsl(240 5% 64.9%);
  }
  &__tables-info-link {
    display: inline-flex;
    align-items: center;
    height: fit-content;
    min-height: 36px;
    padding-inline: 12px;
    border-radius: 6px;
    font-size: 14px;
    color: hsl(240 5.9% 10%);
    background-color: hsl(0 0% 98%);

    &:hover {
      background-color: hsl(0deg 0% 98% / 90%);
    }

    svg {
      height: 16px;
      width: 16px;
    }
  }
  &__table-wr {
    border: 1px solid hsl(240 3.7% 15.9%);
    border-radius: 6px;

    table {
      width: 100%;
      text-indent: 0;
      border-color: inherit;
      border-collapse: collapse;

      thead {
      }

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

        &:last-of-type {
          text-align: right;
        }

        &:first-of-type {
          min-width: 100px;
        }
      }

      tbody {
        tr {
          &:last-of-type {
            border: none;
          }
        }
      }

      td {
        height: 48px;
        padding: 1px 16px;
        text-align: left;
        font-size: 14px;
        font-weight: 500;
        color: hsl(0 0% 98%);

        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
  &__table-status {
    display: inline-block;
    padding: 4px 10px;
    border-width: 1px;
    border-style: solid;
    border-radius: 99999px;
    font-size: 12px;
  }
  &__table-link {
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);
  }
  &__tables-grid {
    display: grid;
    gap: 32px;
    margin-top: 24px;
  }
  &__tables-grid-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  &__tables-grid-item-text {
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);

    &:nth-of-type(2) {
      text-align: right;
    }

    &:last-of-type {
      text-align: right;
    }
  }
}
</style>
