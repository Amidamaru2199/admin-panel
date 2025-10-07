<template>
	<TheDialog ref="dialogRef">
		<template #trigger>
			<slot name="trigger" />
		</template>

		<template #title>Фильтровать пользователей</template>

		<template #description>Выбери каких пользователей показать</template>

		<template #body>
			<TheSelect v-model="usersFilters.tariff" placeholder="Тариф" aria-label="Тариф" :options="tariffOptions" />

			<div class="servers__dialog-grid">
				<div class="servers__dialog-group">
					<div class="servers__dialog-grid-item">
						<input id="name" name="name" v-model="usersFilters.fullname" placeholder="Имя" type="text" />
					</div>
					<div class="servers__dialog-grid-item">
						<input id="tgID" name="tgID" v-model="usersFilters.tgID" placeholder="TGid" type="text" />
					</div>
					<TheDatePicker v-model="usersFilters.regMinDate" id="date-reg-min-date" label="Дата регистрации" />
					<TheDatePicker v-model="usersFilters.subMinDate" id="date-sub-min-date"
						label="Дата окончания подписки" />
				</div>
				<div class="servers__dialog-group">
					<div class="servers__dialog-grid-item">
						<input id="username" name="username" v-model="usersFilters.username" placeholder="Юзернейм"
							type="text" />
					</div>
					<NumberFieldRoot class="servers__dialog-grid-item">
						<NumberFieldDecrement class="servers__dialog-decrement">
							<TheMinus />
						</NumberFieldDecrement>
						<NumberFieldInput v-model="usersFilters.tgID" placeholder="ID" />
						<NumberFieldIncrement class="servers__dialog-increment">
							<ThePlus />
						</NumberFieldIncrement>
					</NumberFieldRoot>
					<TheDatePicker v-model="usersFilters.regMaxDate" id="date-reg-max-date" label="&nbsp;" />
					<TheDatePicker v-model="usersFilters.subMaxDate" id="date-sub-max-date" label="&nbsp;" />
				</div>
			</div>
		</template>

		<template #footer>
			<button v-if="usersStore.isUsersFilters" @click="resetForm" class="filter__dialog-save-button">Сбросить
				фильтры</button>
			<button @click="filterUsers" class="filter__dialog-save-button">Фильтровать</button>
		</template>
	</TheDialog>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import TheDialog from '@/components/ui/TheDialog.vue'
import TheSelect from '@/components/ui/TheSelect.vue'
import TheDatePicker from '@/components/ui/TheDatePicker.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()
const dialogRef = ref(null)
const usersFilters = ref({
	tgID: '',
	username: '',
	fullname: '',
	tariff: '',
	regMinDate: '',
	regMaxDate: '',
	subMinDate: '',
	subMaxDate: '',
})

const tariffOptions = computed(() => {
	if (!usersStore.allTariffs || !Array.isArray(usersStore.allTariffs)) {
		return []
	}
	return usersStore.allTariffs.map(tariff => ({
		label: tariff.name,
		value: tariff.id
	}))
})

const filterUsers = async () => {
	try {
		await usersStore.fetchAllUsers(usersFilters.value)

		if (dialogRef.value) {
			dialogRef.value.isOpen = false
		}
	} catch (error) {
		console.error('Error filtering users:', error)
	}
}

const resetForm = () => {
	usersFilters.value = {
		tgID: '',
		username: '',
		fullname: '',
		tariff: '',
		regMinDate: '',
		regMaxDate: '',
		subMinDate: '',
		subMaxDate: '',
	}
}

watch(usersFilters, () => {
	if (usersFilters.value.tgID || usersFilters.value.username || usersFilters.value.fullname || usersFilters.value.tariff || usersFilters.value.regMinDate || usersFilters.value.regMaxDate || usersFilters.value.subMinDate || usersFilters.value.subMaxDate) {
		usersStore.isUsersFilters = true
	} else {
		usersStore.isUsersFilters = false
	}
}, { deep: true })

onMounted(async () => {
	usersStore.fetchAllTariffs()
})
</script>

<style lang="scss">
.filter__dialog-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 8px;
}

.filter__dialog-group {
	display: grid;
	align-content: flex-start;
	gap: 12px;
}

.filter__dialog-increment,
.filter__dialog-decrement {
	display: none;
	align-items: center;
	justify-content: center;
	position: absolute;
	right: 12px;
	width: 20px;
	height: 10px;
}

.filter__dialog-increment {
	bottom: 22px;
}

.filter__dialog-decrement {
	bottom: 10px;
}

.filter__dialog-grid-item {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-items: center;
	gap: 16px;
	position: relative;

	&:hover {

		.filter__dialog-increment,
		.filter__dialog-decrement {
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

.filter__dialog-save-button {
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
