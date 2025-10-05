const API_URL = 'https://bot.adronvpn.ru'

export const getUserCount = async () => {
  try {
    const response = await fetch(`${API_URL}/user/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (e) {
    console.error('getUserCount error:', e)
    throw e
  }
}

export const getAllServers = async () => {
  try {
    const response = await fetch(`${API_URL}/server/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (e) {
    console.error('getAllServers error:', e)
    throw e
  }
}

export const getAllTariffs = async () => {
  try {
    const response = await fetch(`${API_URL}/tariff/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (e) {
    console.error('getAllTariffs error:', e)
    throw e
  }
}

export const getAllUsers = async (filters = {}) => {
  try {
    // Строим query параметры
    const queryParams = new URLSearchParams()
    
    // Добавляем параметры фильтрации
    if (filters.tgID) queryParams.append('tgID', filters.tgID)
    if (filters.username) queryParams.append('username', filters.username)
    if (filters.tariff) queryParams.append('tariff', filters.tariff)
    if (filters.regMinDate) queryParams.append('regMinDate', filters.regMinDate)
    if (filters.regMaxDate) queryParams.append('regMaxDate', filters.regMaxDate)
    if (filters.subMinDate) queryParams.append('subMinDate', filters.subMinDate)
    if (filters.subMaxDate) queryParams.append('subMaxDate', filters.subMaxDate)
    
    // Добавляем параметры пагинации
    if (filters.offset !== undefined) queryParams.append('offset', filters.offset)
    if (filters.limit !== undefined) queryParams.append('limit', filters.limit)

    const url = `${API_URL}/user/all${queryParams.toString() ? '?' + queryParams.toString() : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (e) {
    console.error('getAllUsers error:', e)
    throw e
  }
}

export const getServerCookies = async () => {
  try {
    const response = await fetch(`${API_URL}/server/cookies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Возвращаем текст, так как API возвращает text/plain
    const data = await response.text()


    return data
  } catch (e) {
    console.error('getServerCookies error:', e)
    throw e
  }
}

export const createServer = async (serverData) => {
  try {
    const response = await fetch(`${API_URL}/server`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Возвращаем текст, так как API возвращает text/plain
    const data = await response.text()


    return data
  } catch (e) {
    console.error('createServer error:', e)
    throw e
  }
}
export const createTariff = async (serverData) => {
  try {
    const response = await fetch(`${API_URL}/tariff`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Возвращаем текст, так как API возвращает text/plain
    const data = await response.text()


    return data
  } catch (e) {
    console.error('createTariff error:', e)
    throw e
  }
}

export const updateServer = async (serverId, serverData) => {
  try {
    const response = await fetch(`${API_URL}/server/${serverId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serverData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Возвращаем текст, так как API возвращает text/plain
    const data = await response.text()

    return data
  } catch (e) {
    console.error('updateServer error:', e)
    throw e
  }
}
