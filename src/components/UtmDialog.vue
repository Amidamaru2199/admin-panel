<template>
	<TheDialog>
		<template #trigger>
			<slot name="trigger" />
		</template>

		<template #title>Добавление нового кода</template>

		<template #description>Укажите данные рекламы</template>

		<template #body>
			<div class="utm__dialog-grid">
				<div class="utm__dialog-group">
					<div class="utm__dialog-grid-item">
						<label for="">Название UTM кода</label>
						<input placeholder="UTM код" type="text" />
					</div>
					<div class="utm__dialog-grid-item">
						<label for="">Ссылка на рекламу</label>
						<input placeholder="Ссылка на рекламу" type="text" />
					</div>
					<div class="utm__dialog-grid-item">
						<label for="">Цена рекламы</label>
						<input placeholder="Цена" type="text" />
					</div>
				</div>
			</div>
		</template>

		<template #footer>
			<button class="utm__dialog-save-button">Отмена</button>
			<button class="utm__dialog-save-button">Добавить</button>
		</template>
	</TheDialog>
</template>

<script setup>
import TheDialog from '@/components/ui/TheDialog.vue'
</script>

<style lang="scss">
.utm__dialog-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
}

.utm__dialog-group {
	display: grid;
	align-content: flex-start;
	gap: 12px;
}

.utm__dialog-increment,
.utm__dialog-decrement {
	display: none;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 12px;
	width: 20px;
	height: 10px;
}

.utm__dialog-increment {
	bottom: 22px;
}

.utm__dialog-decrement {
	bottom: 10px;
}

.utm__dialog-grid-item {
	display: flex;
	flex-direction: column;
	position: relative;

	&:hover {

		.utm__dialog-increment,
		.utm__dialog-decrement {
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

.utm__dialog-save-button {
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
