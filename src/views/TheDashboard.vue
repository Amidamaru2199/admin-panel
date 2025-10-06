<template>
	<div class="dashboard">
		<div v-if="usersStore.userStats" class="dashboard__top-containars">
			<div class="dashboard__top-containar">
				<span class="dashboard__top-containar-title">Всего юзеров</span>
				<span class="dashboard__top-containar-count">{{ usersStore.userStats.user_count }}</span>
				<span class="dashboard__top-containar-summ">+{{ usersStore.userStats.user_count_reg_today }} за
					сегодня</span>
				<TheMens />
			</div>
			<div class="dashboard__top-containar">
				<span class="dashboard__top-containar-title">Платящих юзеров</span>
				<span class="dashboard__top-containar-count">{{
					usersStore.userStats.user_count_with_subscription
				}}</span>
				<span class="dashboard__top-containar-summ">Ориент. доход: 497970 ₽/мес.</span>
				<TheDollar />
			</div>
			<div class="dashboard__top-containar">
				<span class="dashboard__top-containar-title">С автоплатежами</span>
				<span class="dashboard__top-containar-count">{{
					usersStore.userStats.user_count_with_auto_pay
				}}</span>
				<TheCash />
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue'
import TheMens from '@/components/icons/TheMens.vue'
import TheDollar from '@/components/icons/TheDollar.vue'
import TheCash from '@/components/icons/TheCash.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()

onMounted(async () => {
	await usersStore.fetchUserStats()
})
</script>

<style scoped lang="scss">
.dashboard {
	&__top-containars {
		display: grid;
		gap: 32px;
		padding-bottom: 32px;
	}

	&__top-containar {
		display: flex;
		flex-direction: column;
		position: relative;
		padding: 24px;
		border: 1px solid hsl(240 3.7% 15.9%);
		border-radius: 8px;

		svg {
			position: absolute;
			top: 24px;
			right: 24px;
			height: 16px;
			width: 16px;
		}
	}

	&__top-containar-title {
		margin-bottom: 12px;
		font-size: 14px;
		font-weight: 500;
		color: hsl(0 0% 98%);
	}

	&__top-containar-count {
		margin-bottom: 4px;
		font-size: 24px;
		font-weight: 700;
		color: hsl(0 0% 98%);
	}

	&__top-containar-summ {
		font-size: 12px;
		color: hsl(240 5% 64.9%);
	}
}
</style>
