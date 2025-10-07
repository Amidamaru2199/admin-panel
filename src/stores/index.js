import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserCount, getAllServers, getAllTariffs, getAllUsers, getServerCookies, createServer, updateServer, createTariff, updateUserSub as apiUpdateUserSub, sendNewsletter } from '@/api/index.js'
import { useToast } from '@/composables/useToast'

export const useUsersStore = defineStore('users', () => {
	const userStats = ref(null)
	const allServers = ref(null)
	const allTariffs = ref(null)
	const allUsers = ref(null)
	const serverCookies = ref(null)
	const isUsersFilters = ref(false)

	// Состояние для фильтрации и пагинации пользователей
	const usersFilters = ref({
		tgID: '',
		username: '',
		fullname: '',
		tariff: '',
		regMinDate: '',
		regMaxDate: '',
		subMinDate: '',
		subMaxDate: '',
		offset: 0,
		limit: 1  // 1 пользователь на странице
	})

	const usersPagination = ref({
		currentPage: 1,
		totalItems: 0,
		itemsPerPage: 1  // 1 пользователь на странице
	})

	const isLoading = ref(false)
	const error = ref(null)

	const { success, error: showError } = useToast()

	const fetchUserStats = async () => {
		isLoading.value = true
		error.value = null

		try {
			const data = await getUserCount()
			userStats.value = data
		} catch (err) {
			error.value = err
			console.error('Failed to fetch user stats:', err)
		} finally {
			isLoading.value = false
		}
	}

	const fetchAllServers = async () => {
		isLoading.value = true
		error.value = null

		try {
			const data = await getAllServers()

			allServers.value = data.сервера
		} catch (err) {
			error.value = err
			console.error('Failed to fetch user stats:', err)
		} finally {
			isLoading.value = false
		}
	}

	const fetchAllTariffs = async () => {
		isLoading.value = true
		error.value = null

		try {
			const data = await getAllTariffs()

			allTariffs.value = data.тарифы
		} catch (err) {
			error.value = err
			console.error('Failed to fetch user stats:', err)
		} finally {
			isLoading.value = false
		}
	}

	const fetchAllUsers = async (customFilters = {}) => {
		isLoading.value = true
		error.value = null

		try {
			// Объединяем текущие фильтры с переданными
			const filters = { ...usersFilters.value, ...customFilters }

			const data = await getAllUsers(filters)

			allUsers.value = data.юзеры || []

			// Обновляем пагинацию
			// Если API не возвращает total, делаем отдельный запрос для подсчета
			if (data.total !== undefined) {
				usersPagination.value.totalItems = data.total
			} else {
				// Если нет поля total, делаем запрос без пагинации для подсчета общего количества
				const countData = await getAllUsers({ ...filters, offset: 0, limit: 1000 })
				usersPagination.value.totalItems = countData.юзеры?.length || 0
			}
			usersPagination.value.currentPage = Math.floor(filters.offset / filters.limit) + 1

		} catch (err) {
			error.value = err
			console.error('Failed to fetch users:', err)
		} finally {
			isLoading.value = false
		}
	}

	const fetchServerCookies = async () => {
		isLoading.value = true
		error.value = null

		try {
			const data = await getServerCookies()
			serverCookies.value = data

			success(
				'Cookies со всех серверов успешно обновлены',
			)
		} catch (err) {
			error.value = err
			console.error('Failed to fetch server cookies:', err)

			showError(
				'Не удалось получить cookies с серверов',
				err,
			)
		} finally {
			isLoading.value = false
		}
	}

	const addServer = async (serverData) => {
		isLoading.value = true
		error.value = null

		try {
			const data = await createServer(serverData)

			success(
				'Сервер создан',
				'Новый сервер успешно добавлен',
			)

			await fetchAllServers()

			return data
		} catch (err) {
			error.value = err
			console.error('Failed to create server:', err)

			showError(
				'Ошибка создания сервера',
				err,
			)

			throw err
		} finally {
			isLoading.value = false
		}
	}

	const addTariff = async (serverData) => {
		isLoading.value = true
		error.value = null

		try {
			const data = await createTariff(serverData)

			success(
				'Новый тариф успешно добавлен',
				'Тариф добавлен в систему',
				{ duration: 3000 }
			)

			await fetchAllTariffs()

			return data
		} catch (err) {
			error.value = err
			console.error('Failed to create tariff:', err)

			showError(
				'Не удалось создать новый тариф',
			)

			throw err
		} finally {
			isLoading.value = false
		}
	}

	const editServer = async (serverId, serverData) => {
		isLoading.value = true
		error.value = null

		try {
			const data = await updateServer(serverId, serverData)

			success(
				'Сервер успешно обновлен',
			)

			await fetchAllServers()

			return data
		} catch (err) {
			error.value = err
			console.error('Failed to update server:', err)

			showError(
				'Не удалось сохранить изменения сервера',
				err
			)

			throw err
		} finally {
			isLoading.value = false
		}
	}

	const updateUserSub = async (tgId, days) => {
		isLoading.value = true
		error.value = null

		try {
			const data = await apiUpdateUserSub(tgId, days)

			success(
				`Пользователю добавлено ${days} дней подписки`,
			)

			await fetchAllUsers()

			return data
		} catch (err) {
			error.value = err
			console.error('Failed to update server:', err)

			showError(
				'Не удалось сохранить изменения сервера',
				err
			)

			throw err
		} finally {
			isLoading.value = false
		}
	}

	const sendNewsletterMessage = async (filters, message, image = null) => {
		isLoading.value = true
		error.value = null

		try {
			const result = await sendNewsletter(filters, message, image)

			success(
				'Сообщение успешно отправлено пользователям',
			)

			return result
		} catch (err) {
			error.value = err
			console.error('Failed to send newsletter:', err)

			showError(
				'Не удалось отправить сообщение пользователям',
				err
			)

			throw err
		} finally {
			isLoading.value = false
		}
	}

	// Методы для управления фильтрами пользователей
	const updateUsersFilters = (newFilters) => {
		usersFilters.value = { ...usersFilters.value, ...newFilters }
	}

	const resetUsersFilters = () => {
		usersFilters.value = {
			tgID: '',
			username: '',
			fullname: '',
			tariff: '',
			regMinDate: '',
			regMaxDate: '',
			subMinDate: '',
			subMaxDate: '',
			offset: 0,
			limit: 1  // 1 пользователь на странице
		}
	}

	const goToUsersPage = (page) => {
		const offset = (page - 1) * usersFilters.value.limit
		usersFilters.value.offset = offset
		usersPagination.value.currentPage = page
		fetchAllUsers()
	}

	const changeUsersPageSize = (newSize) => {
		usersFilters.value.limit = newSize
		usersFilters.value.offset = 0
		usersPagination.value.currentPage = 1
		usersPagination.value.itemsPerPage = newSize
		fetchAllUsers()
	}

	return {
		userStats,
		allServers,
		allTariffs,
		allUsers,
		serverCookies,
		isUsersFilters,
		usersFilters,
		usersPagination,
		isLoading,
		error,

		fetchUserStats,
		fetchAllServers,
		fetchAllTariffs,
		fetchAllUsers,
		fetchServerCookies,
		addServer,
		addTariff,
		editServer,
		updateUserSub,
		sendNewsletterMessage,

		updateUsersFilters,
		resetUsersFilters,
		goToUsersPage,
		changeUsersPageSize,
	}
})
