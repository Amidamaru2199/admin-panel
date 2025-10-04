import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserCount, getAllServers, getServerCookies, createServer, updateServer } from '@/api/index.js'
import { useToast } from '@/composables/useToast'

export const useUsersStore = defineStore('users', () => {
  const userStats = ref(null)
  const allServers = ref(null)
  const serverCookies = ref(null)

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
      console.log(data.сервера)

      allServers.value = data.сервера
    } catch (err) {
      error.value = err
      console.error('Failed to fetch user stats:', err)
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
      
      // Показываем успешный тост
      success(
        'Cookies со всех серверов успешно обновлены',
      )
    } catch (err) {
      error.value = err
      console.error('Failed to fetch server cookies:', err)
      
      // Показываем тост с ошибкой
      showError(
        'Не удалось получить cookies с серверов',
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
      
      // Показываем успешный тост
      success(
        'Сервер создан',
        'Новый сервер успешно добавлен',
        { duration: 3000 }
      )
      
      // Обновляем список серверов
      await fetchAllServers()
      
      return data
    } catch (err) {
      error.value = err
      console.error('Failed to create server:', err)
      
      // Показываем тост с ошибкой
      showError(
        'Ошибка создания сервера',
        'Не удалось создать новый сервер',
        { duration: 5000 }
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
      
      // Показываем успешный тост
      success(
        'Сервер обновлен',
        'Изменения сервера успешно сохранены',
        { duration: 3000 }
      )
      
      // Обновляем список серверов
      await fetchAllServers()
      
      return data
    } catch (err) {
      error.value = err
      console.error('Failed to update server:', err)
      
      // Показываем тост с ошибкой
      showError(
        'Ошибка обновления сервера',
        'Не удалось сохранить изменения сервера',
        { duration: 5000 }
      )
      
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    userStats,
    allServers,
    serverCookies,
    isLoading,
    error,

    fetchUserStats,
    fetchAllServers,
    fetchServerCookies,
    addServer,
    editServer,
  }
})
