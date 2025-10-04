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
