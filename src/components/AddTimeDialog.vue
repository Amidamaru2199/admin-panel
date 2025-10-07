<template>
	<TheDialog ref="dialogRef">
		<template #trigger>
			<slot name="trigger" />
		</template>

		<template #title>Добавление времени</template>

		<template #description>Укажите сколько дней вы хотите добавить</template>

		<template #body>
			<div class="time__dialog-grid">
				<div class="time__dialog-group">
					<div class="time__dialog-grid-item">
						<input v-model="days" type="text" />
					</div>
				</div>
			</div>
		</template>

		<template #footer>
			<button @click="addTime" class="time__dialog-save-button">Добавить</button>
		</template>
	</TheDialog>
</template>

<script setup>
import { ref } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import { useUsersStore } from '@/stores/index'

const props = defineProps({
	tgId: {
		type: Number,
		required: true
	}
})

const days = ref(0)
const dialogRef = ref(null)

const usersStore = useUsersStore()

const addTime = async () => {
	try {
		await usersStore.updateUserSub(props.tgId, days.value)
		// Закрываем диалог после успешного обновления
		if (dialogRef.value) {
			dialogRef.value.isOpen = false
		}
	} catch (error) {
		console.error('Error adding time:', error)
	}
}
</script>

<style lang="scss" scoped>
.time__dialog-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
}

.time__dialog-group {
	display: grid;
	align-content: flex-start;
	gap: 12px;
}

.time__dialog-grid-item {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	align-items: center;
	gap: 16px;
	position: relative;

	&:hover {

		.time__dialog-increment,
		.time__dialog-decrement {
			display: flex;
		}
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
		color: $primary-color;

		&:focus {
			border: 1px solid $primary-color;
		}
	}
}

.time__dialog-save-button {
	height: 40px;
	padding-inline: 16px;
	border-radius: 6px;
	color: $background-color;
	background-color: $primary-color;

	&:hover {
		background-color: hsl(240 5% 64.9%);
	}
}
</style>
