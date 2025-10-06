<template>
	<div class="utm block">
		<div class="block__header">
			<div class="block__header-text">
				<h1 class="block__title">Регистрации по UTM</h1>
				<span class="block__subtitle">Мониторинг эффективности рекламы</span>
			</div>

			<UtmDialog>
				<template #trigger>
					<div class="block__header-button block__header-button_add block__dialog-trigger">
						<TheCross />Новый UTM код
					</div>
				</template>
			</UtmDialog>
		</div>

		<div class="block__table-wr">
			<table>
				<thead>
					<tr>
						<th>UTM код</th>
						<th>Цена рекламы</th>
						<th>Ссылка</th>
						<th>Кол-во регистраций</th>
						<th>Кол-во подключений</th>
						<th>Кол-во оплат</th>
						<th>Конверсия (запуск/оплата)</th>
						<th>Цена лида (цена рекламы/платежи)</th>
						<th>Сумма в рублях</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in 10" :key="index">
						<td>gio-test</td>
						<td>0</td>
						<td>@null</td>
						<td>154</td>
						<td>49</td>
						<td>24</td>
						<td>15.58</td>
						<td>0</td>
						<td>13911.00</td>
						<td>
							<UtmDialog>
								<template #trigger>
									<TheFile class="servers__dialog-trigger" />
								</template>
							</UtmDialog>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<ThePagination :total-items="37659" :items-per-page="20" :current-page="currentPage"
			@update:current-page="handlePageChange" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import UtmDialog from '@/components/UtmDialog.vue'
import ThePagination from '@/components/ui/ThePagination.vue'

const currentPage = ref(1)

const handlePageChange = (page) => {
	currentPage.value = page
	// Здесь можно добавить логику загрузки данных для новой страницы
	console.log('Переход на страницу:', page)
}
</script>

<style lang="scss">
.utm {
	&__dialog-trigger {
		cursor: pointer;
	}

	&__dropdown-content {
		min-width: 120px;
		padding: 4px;
		background-color: hsl(240 10% 3.9%);
		border: 1px solid hsl(240 3.7% 25%);
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
		color: hsl(0 0% 98%);

		&:hover {
			background-color: hsl(240deg 3.7% 25%);
		}
	}
}
</style>
