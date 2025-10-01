<template>
  <div class="header">
    <nav class="header__navigation">
      <RouterLink class="header__logo-wr" to="/">
        <TheLogo />
        <span>AdronVPN</span>
      </RouterLink>
      <RouterLink to="/dashboard">Дашборд</RouterLink>
      <RouterLink to="/">Сервера</RouterLink>
      <RouterLink to="/">Тарифы</RouterLink>
      <RouterLink to="/">Пользователи</RouterLink>
      <RouterLink to="/">Платежи</RouterLink>
      <RouterLink to="/">UTM коды</RouterLink>
      <RouterLink to="/">Рассылки</RouterLink>
      <RouterLink to="/">Выплаты</RouterLink>
      <RouterLink to="/">Рефералька</RouterLink>
    </nav>

    <button class="header__account-button">
      <TheAccount />
    </button>
  </div>
</template>

<script setup>
import TheAccount from './icons/TheAccount.vue'
import TheLogo from './icons/TheLogo.vue'
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  min-height: 64px;
  padding-inline: 24px;
  border-bottom: 1px solid hsl(240 3.7% 15.9%);

  &__navigation {
    display: flex;
    align-items: center;
    gap: 24px;

    a {
      font-size: 14px;
    }
  }

  &__logo-wr {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 16px;
      color: hsl(0 0% 98%);
    }
  }

  &__account-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    margin-left: auto;
    border: none;
    border-radius: 50%;
    background-color: hsl(240 3.7% 15.9%);

    &:hover {
      background-color: hsl(240deg 3.7% 15.9% / 80%);
    }
  }
}
</style>
