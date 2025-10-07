<template>
	<div class="newsletter block">
		<div class="block__header">
			<div class="block__header-text">
				<h1 class="block__title">Рассылки</h1>
				<span class="block__subtitle">Отправка рассылок пользователям с выбранными параметрами</span>
			</div>
		</div>

		<div class="newsletter__grid">
			<div class="newsletter__left">
				<div class="newsletter__input-group">
					<label for="file">Картинка для рассылки</label>
					<input id="file" name="file" ref="fileInput" @change="handleFileChange" placeholder="Файл не выбран"
						type="file" accept="image/*" />
				</div>
				<div class="newsletter__input-group">
					<label for="description">Текст рассылки</label>
					<textarea name="description" id="description" cols="30" rows="10" v-model="message"></textarea>
				</div>
				<div class="newsletter__buttons">
					<button @click="sendNewsletter" class="newsletter__button" :disabled="disabledSendButton">
						Отправить
						<TheTelegram />
					</button>
				</div>
			</div>
			<div class="newsletter__right">
				<span class="newsletter__swither-text">Фильтр по пользователям которые получат рассылку</span>
				<TheSelect v-model="tarif" placeholder="Тариф" aria-label="Тариф" :options="tariffOptions" />
				<div class="servers__dialog-grid-item">
					<input id="username" name="username" v-model="usersFilters.username" placeholder="Юзернейм"
						type="text" />
				</div>
				<div class="servers__dialog-grid-item">
					<input id="tg-id" name="tg-id" v-model="usersFilters.tgID" placeholder="TGid" type="number" />
				</div>
				<div class="newsletter__pickers">
					<TheDatePicker v-model="usersFilters.regMinDate" id="date-reg-min-date" label="Дата регистрации" />
					<TheDatePicker v-model="usersFilters.regMaxDate" id="date-reg-max-date" label="&nbsp;" />
					<TheDatePicker v-model="usersFilters.subMinDate" id="date-sub-min-date"
						label="Дата окончания подписки" />
					<TheDatePicker v-model="usersFilters.subMaxDate" id="date-sub-max-date" label="&nbsp;" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import TheTelegram from '@/components/icons/TheTelegram.vue'
import TheSelect from '@/components/ui/TheSelect.vue'
import TheDatePicker from '@/components/ui/TheDatePicker.vue'
import { useUsersStore } from '@/stores/index'

const usersStore = useUsersStore()
const fileInput = ref(null)
const selectedFile = ref(null)
const message = ref('')
const tarif = ref('')
const usersFilters = ref({
	tgID: '',
	username: '',
	tariff: '',
	regMinDate: '',
	regMaxDate: '',
	subMinDate: '',
	subMaxDate: '',
})

onMounted(async () => {
	usersStore.fetchAllTariffs()
})

const disabledSendButton = computed(() => {
	return !message.value
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

const handleFileChange = (event) => {
	const file = event.target.files[0]
	if (file) {
		selectedFile.value = file
	} else {
		selectedFile.value = null
	}
}

const sendNewsletter = async () => {
	try {
		if (!message.value) {
			alert('Введите текст сообщения')
			return
		}

		const cleanedFilters = {}
		Object.keys(usersFilters.value).forEach(key => {
			if (usersFilters.value[key] && usersFilters.value[key].toString().trim() !== '') {
				cleanedFilters[key] = usersFilters.value[key].toString().trim()
			}
		})

		if (tarif.value) {
			cleanedFilters.tariff = tarif.value
		}

		await usersStore.sendNewsletterMessage(cleanedFilters, message.value, selectedFile.value)

		message.value = ''
		selectedFile.value = null
		tarif.value = ''
		if (fileInput.value) {
			fileInput.value.value = ''
		}
	} catch (error) {
		console.error('Ошибка отправки рассылки:', error)
	}
}
</script>

<style lang="scss">
.newsletter {
	input[type='file']::-webkit-file-upload-button {
		display: none;
	}

	input[type='file'] {
		padding-top: 24px;
	}

	&__grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
		margin-top: 24px;
	}

	&__left {
		display: grid;
		gap: 12px;
	}

	&__right {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__input-group {
		display: flex;
		flex-direction: column;
		position: relative;

		&_switcher {
			flex-direction: row;
			align-items: center;
			gap: 8px;
		}

		&:hover {

			.servers__dialog-increment,
			.servers__dialog-decrement {
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
		}

		span {
			margin: 0;
		}

		textarea,
		input {
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

		textarea {
			height: 191px;
			padding: 12px;
		}
	}

	&__buttons {
		display: flex;
		justify-content: space-between;
	}

	&__button {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		height: 40px;
		padding-inline: 16px;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		background-color: $primary-color;
		color: $background-color;

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
			cursor: not-allowed;
		}

		&:hover {
			background-color: $primary-color;
			opacity: 0.8;
		}

		svg {
			width: 16px;
			height: 16px;
		}
	}

	&__pickers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
}
</style>
