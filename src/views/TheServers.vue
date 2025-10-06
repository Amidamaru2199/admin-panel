<template>
	<div class="servers block">
		<div class="block__header">
			<div class="block__header-text">
				<h1 class="block__title">Сервера</h1>
				<span class="block__subtitle">Управление VPN серверами</span>
			</div>
			<div class="block__switcher-wr">
				<TheSwitcher v-model="switchState" />
				<TheOko v-if="switchState" />
				<TheOkoLine v-else />
			</div>

			<button @click="getServerCookies" class="block__header-button">Получить куки для серверов</button>

			<AddServerDialog>
				<template #trigger>
					<div class="block__header-button block__header-button_add block__dialog-trigger">
						<TheCross />Добавить сервер
					</div>
				</template>
			</AddServerDialog>
		</div>

		<div class="block__table-wr">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Название</th>
						<th>Страна</th>
						<th>IP адрес</th>
						<th>Описание</th>
						<th>Инфо</th>
						<th>Активен</th>
						<th>Распределение</th>
						<th>Вес</th>
						<th>Юзеров</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="el in filteredServers" :key="el.id" :class="{ 'tr-inactive': !el.is_active }">
						<td>{{ el.id }}</td>
						<td>
							<div>
								<img :src="getFlagUrl(el.code)" alt="flag" />
								{{ el.name }}
								<span>({{ el.code }})</span>
							</div>
						</td>
						<td>{{ el.country }}</td>
						<td>{{ el.ip }}</td>
						<td>{{ el.description }}</td>
						<td>{{ el.info }}</td>
						<td>
							<TheSucsess v-if="el.is_active" />
							<TheBad v-else />
						</td>
						<td>
							<TheSucsess v-if="el.is_excluded" />
							<TheBad v-else />
						</td>
						<td>{{ el.weight }}</td>
						<td>{{ el.user_count }}</td>
						<td>
							<div>
								<AddServerDialog mode="edit" :server-data="el">
									<template #trigger>
										<TheFile class="servers__dialog-trigger" />
									</template>
								</AddServerDialog>
								<a :href="`https://${el.ip}:${el.port_panel}/${el.uri_path}/`" target="_blank">
									<TheLink />
								</a>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AddServerDialog from '@/components/AddServerDialog.vue'
import TheSwitcher from '@/components/ui/TheSwitcher.vue'
import TheOkoLine from '@/components/icons/TheOkoLine.vue'
import TheOko from '@/components/icons/TheOko.vue'
import TheCross from '@/components/icons/TheCross.vue'
import TheSucsess from '@/components/icons/TheSucsess.vue'
import TheBad from '@/components/icons/TheBad.vue'
import TheFile from '@/components/icons/TheFile.vue'
import TheLink from '@/components/icons/TheLink.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()
const switchState = ref(false)

const filteredServers = computed(() => {
	if (!usersStore.allServers) return []

	if (switchState.value) {
		return usersStore.allServers
	} else {
		return usersStore.allServers.filter(server => server.is_active === true)
	}
})

const getServerCookies = async () => {
	await usersStore.fetchServerCookies()
}

const getFlagUrl = (countryCode) => {
	if (!countryCode) return ''
	return `https://flagcdn.com/40x30/${countryCode.toLowerCase()}.png`
}

onMounted(async () => {
	await usersStore.fetchAllServers()
})
</script>

<style lang="scss">
.servers {
	&__dialog-trigger {
		cursor: pointer;
	}

	&__server-info {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	&__flag {
		width: 24px;
		height: 18px;
		border-radius: 2px;
		object-fit: cover;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	&__server-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	&__code {
		font-size: 12px;
		color: hsl(0 0% 64.9%);
		font-weight: 400;
	}
}
</style>
