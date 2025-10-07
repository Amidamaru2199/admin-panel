<template>
	<div class="header">
		<nav class="header__navigation">
			<RouterLink to="/dashboard">Дашборд</RouterLink>
			<RouterLink to="/servers">Сервера</RouterLink>
			<RouterLink to="/tariffs">Тарифы</RouterLink>
			<RouterLink to="/users">Пользователи</RouterLink>
			<!-- <RouterLink to="/utm">UTM коды</RouterLink> -->
			<RouterLink to="/newsletter">Рассылки</RouterLink>
		</nav>

		<DropdownMenuRoot>
			<DropdownMenuTrigger class="header__account-button">
				<TheAccount />
			</DropdownMenuTrigger>

			<DropdownMenuPortal>
				<DropdownMenuContent class="header__dropdown-content" align="end">
					<div class="header__dropdown-item">Аккаунт</div>
					<hr />
					<div class="header__dropdown-item">Выход</div>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenuRoot>
	</div>
</template>

<script setup>
import TheAccount from './icons/TheAccount.vue'
</script>

<style lang="scss">
.header {
	display: flex;
	align-items: center;
	min-height: 64px;
	padding-inline: 32px;
	border-bottom: 1px solid hsl(240 3.7% 15.9%);

	&__navigation {
		display: flex;
		align-items: center;
		gap: 24px;

		a {
			font-size: 14px;
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

		svg {
			width: 20px;
			height: 20px;
		}
	}

	&__dropdown-content {
		min-width: 120px;
		padding: 4px;
		background-color: hsl(240 10% 3.9%);
		border: 1px solid $secondary-color;
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
		color: $primary-color;

		&:hover {
			background-color: hsl(240deg 3.7% 25%);
		}
	}
}
</style>
