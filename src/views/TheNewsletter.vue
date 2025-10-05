<template>
  <div class="newsletter block">
    <div class="block__header">
      <div class="block__header-text">
        <h1 class="block__title">Рассылки</h1>
        <span class="block__subtitle">Отправка рассылок пользователям с выбранными параметрами</span>
      </div>
    </div>

    <div class="newsletter__grid">
      <div class="newsletter__left">
        <div class="newsletter__input-group">
          /tg/send
          <label for="">Картинка для рассылки</label>
          <input placeholder="Файл не выбран" type="file" />
        </div>
        <div class="newsletter__input-group">
          <label for="">Текст рассылки</label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class="newsletter__buttons">
          <button class="newsletter__button">
            Отправить
            <TheTelegram />
          </button>
          <div class="newsletter__swither-wr">
            <span class="newsletter__swither-text">Сделать тест</span>
            <TheSwitcher />
          </div>
        </div>
      </div>
      <div class="newsletter__right">
        <span class="newsletter__swither-text">Фильтр по пользователям которые получат рассылку</span>
        <TheSelect v-model="tarif" placeholder="Тариф" aria-label="Тариф" :options="tarifOptions" />
        <TheSelect v-model="server" placeholder="Сервер" aria-label="Сервер" :options="serverOptions" />
        <div class="servers__dialog-grid-item">
          <input placeholder="Юзернейм" type="text" />
        </div>
        <div class="servers__dialog-grid-item">
          <input placeholder="TGid" type="text" />
        </div>
        <div class="newsletter__pickers">
          <TheDatePicker id="date-start-field" label="Дата регистрации"
            :is-date-unavailable="(date) => date.day === 19" />
          <TheDatePicker id="date-start-field" label="&nbsp;" :is-date-unavailable="(date) => date.day === 19" />
          <TheDatePicker id="date-end-field" label="Дата окончания подписки"
            :is-date-unavailable="(date) => date.day === 19" />
          <TheDatePicker id="date-end-field" label="&nbsp;" :is-date-unavailable="(date) => date.day === 19" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import TheTelegram from '@/components/icons/TheTelegram.vue'

import { ref } from 'vue'
import TheSelect from '@/components/ui/TheSelect.vue'
import TheDatePicker from '@/components/ui/TheDatePicker.vue'

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
</script>

<style lang="scss">
.newsletter {
  input[type='file']::-webkit-file-upload-button {
    visibility: hidden;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-top: 24px;
  }

  &__left {
    display: grid;
    gap: 12px;
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__input-group {
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

    textarea,
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

    textarea {
      height: 240px;
      padding: 12px;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 40px;
    padding-inline: 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    background-color: hsl(0 0% 98%);
    color: hsl(240 5.9% 10%);

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__swither-wr {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__swither-text {
    font-size: 14px;
    font-weight: 500;
    color: hsl(0 0% 98%);
  }

  &__pickers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}
</style>
