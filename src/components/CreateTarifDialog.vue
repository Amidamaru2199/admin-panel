<template>
	<TheDialog ref="dialogRef">
		<template #trigger>
			<slot name="trigger" />
		</template>

		<template #title>{{ dialogTitle }}</template>

		<template #description>{{ dialogDescription }}</template>

		<template #body>
			<form id="tarif-form" @submit.prevent="handleSave">
				<div class="tarif__dialog-grid">
					<div class="tarif__dialog-group">
						<div class="tarif__dialog-grid-item">
							<label for="">Название</label>
							<input v-model="formData.name" type="text" />
						</div>
						<div class="tarif__dialog-grid-item">
							<label for="">Описание</label>
							<input v-model="formData.description" type="text" />
						</div>
						<div class="tarif__dialog-grid-item">
							<label for="">Цена</label>
							<input v-model="formData.price" type="text" />
						</div>

						<NumberFieldRoot v-model="formData.days" class="tarif__dialog-grid-item">
							<NumberFieldDecrement class="tarif__dialog-decrement">
								<TheMinus />
							</NumberFieldDecrement>
							<label for="">Дни</label>
							<NumberFieldInput />
							<NumberFieldIncrement class="tarif__dialog-increment">
								<ThePlus />
							</NumberFieldIncrement>
						</NumberFieldRoot>

						<div class="tarif__dialog-grid-item tarif__dialog-grid-item_switcher">
							<span>Скрыт</span>
							<TheSwitcher v-model="formData.is_hidden" />
						</div>
					</div>
				</div>
			</form>
		</template>

		<template #footer>
			<button type="button" @click="dialogRef.isOpen = false" class="tarif__dialog-save-button">Отмена</button>
			<button type="submit" form="tarif-form" class="tarif__dialog-save-button">{{ buttonText }}</button>
		</template>
	</TheDialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import { useUsersStore } from '@/stores/index'

const props = defineProps({
	mode: {
		type: String,
		default: 'create', // 'create' или 'edit'
		validator: (value) => ['create', 'edit'].includes(value)
	},
	tariffData: {
		type: Object,
		default: null // Данные сервера для редактирования
	}
})

const usersStore = useUsersStore()
const dialogRef = ref(null)

const formData = ref({
	name: '',
	price: '',
	days: '',
	description: '',
	is_hidden: false,
})

// Computed свойства для заголовков
const dialogTitle = computed(() => {
	return props.mode === 'edit' ? 'Редактировать тариф' : 'Создать тариф'
})

const dialogDescription = computed(() => {
	return props.mode === 'edit' ? 'Внесите изменения в тариф' : 'Заполните информацию о новом тарифе'
})

const buttonText = computed(() => {
	return props.mode === 'edit' ? 'Создать' : 'Сохранить'
})

// Функция для заполнения формы данными сервера
const populateForm = (tariff) => {
	if (!tariff) return

	formData.value = {
		name: tariff.name || '',
		price: tariff.price || '',
		days: tariff.days || '',
		description: tariff.description || '',
		is_hidden: tariff.is_hidden !== undefined ? tariff.is_hidden : false,
	}
}

// Watcher для открытия диалога - заполняем форму только когда диалог открывается
watch(() => dialogRef.value?.isOpen, (isOpen) => {
	if (isOpen && props.mode === 'edit' && props.tariffData) {
		populateForm(props.tariffData)
	}
})

const handleSave = async () => {
	try {
		// Вызываем соответствующий метод в зависимости от режима
		if (props.mode === 'edit') {
			// await usersStore.editServer(props.tariffData.id, formData)
		} else {
			await usersStore.addTariff(formData.value)
		}

		// Закрываем диалог после успешного сохранения
		if (dialogRef.value) {
			dialogRef.value.isOpen = false
		}

		// Сбрасываем форму только при создании
		if (props.mode === 'create') {
			resetForm()
		}
	} catch (error) {
		console.error('Error saving server:', error)
	}
}

const resetForm = () => {
	formData.value = {
		name: '',
		price: '',
		days: '',
		description: '',
		is_hidden: false,
	}
}
</script>

<style lang="scss">
.tarif__dialog-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
}

.tarif__dialog-group {
	display: grid;
	align-content: flex-start;
	gap: 12px;
}

.tarif__dialog-increment,
.tarif__dialog-decrement {
	display: none;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 12px;
	width: 20px;
	height: 10px;
}

.tarif__dialog-increment {
	bottom: 22px;
}

.tarif__dialog-decrement {
	bottom: 10px;
}

.tarif__dialog-grid-item {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-items: center;
	gap: 16px;
	position: relative;

	&:hover {

		.tarif__dialog-increment,
		.tarif__dialog-decrement {
			display: flex;
		}
	}

	span,
	label {
		margin: 0 0 8px;
		font-size: 14px;
		line-height: 1;
		font-weight: 500;
		color: $primary-color;
		text-align: right;
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
		color: $primary-color;

		&:focus {
			border: 1px solid $primary-color;
		}
	}
}

.tarif__dialog-save-button {
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
