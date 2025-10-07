<template>
	<div class="tariffs block">
		<div class="block__header">
			<div class="block__header-text">
				<h1 class="block__title">Тарифы</h1>
				<span class="block__subtitle">Управление тарифами</span>
			</div>
			<div class="block__switcher-wr">
				<TheSwitcher v-model="switchState" />
				<TheOko v-if="switchState" />
				<TheOkoLine v-else />
			</div>

			<CreateTarifDialog>
				<template #trigger>
					<div class="block__header-button block__header-button_add block__dialog-trigger">
						<TheCross />Добавить тариф
					</div>
				</template>
			</CreateTarifDialog>
		</div>

		<div class="block__table-wr">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Название</th>
						<th>Описание</th>
						<th>Цена</th>
						<th>Кол-во дней</th>
						<th>Активный</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="el in filteredTariffs" :key="el.id" :class="{ 'tr-inactive': !el.is_hidden }">
						<td>{{ el.id }}</td>
						<td>{{ el.name }}</td>
						<td></td>
						<td>{{ el.price }}</td>
						<td>{{ el.days }}</td>
						<td>
							<TheSucsess v-if="el.is_hidden" />
							<TheBad v-else />
						</td>
						<td>
							<DropdownMenuRoot>
								<DropdownMenuTrigger>
									<button>...</button>
								</DropdownMenuTrigger>

								<DropdownMenuPortal>
									<DropdownMenuContent class="tariffs__dropdown-content" align="end">
										<CreateTarifDialog mode="edit" :tariff-data="el">
											<template #trigger>
												<div class="tariffs__dropdown-item">Редактировать</div>
											</template>
										</CreateTarifDialog>
									</DropdownMenuContent>
								</DropdownMenuPortal>
							</DropdownMenuRoot>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import CreateTarifDialog from '@/components/CreateTarifDialog.vue'
import TheSucsess from '@/components/icons/TheSucsess.vue'
import TheBad from '@/components/icons/TheBad.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()
const switchState = ref(false)

const filteredTariffs = computed(() => {
	if (!usersStore.allTariffs) return []

	if (switchState.value) {
		// Показываем все серверы
		return usersStore.allTariffs
	} else {
		// Показываем только активные серверы
		return usersStore.allTariffs.filter(tariff => tariff.is_hidden === true)
	}
})

onMounted(async () => {
	await usersStore.fetchAllTariffs()
})
</script>

<style lang="scss">
.tariffs {
	&__dialog-trigger {
		cursor: pointer;
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
