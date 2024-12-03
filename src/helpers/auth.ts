import axios from "axios"

const URL_BACKEND = process.env.PLASMO_PUBLIC_URL_BACKEND

// Функция для обновления токенов
export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token")

  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  try {
    // const response = await fetch(REFRESH_URL, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ refresh_token: refreshToken })
    // })

    const response = await axios.post(
      `${URL_BACKEND}/auth/refresh`,
      {
        refresh_token: refreshToken
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    const { refresh_token: newRefreshToken } = response.data.refresh_token

    if (newRefreshToken) {
      localStorage.setItem("refresh_token", newRefreshToken)
    }

    return newRefreshToken
  } catch (error) {
    console.error("Error during token refresh:", error)
    throw error
  }
}

export async function logout() {
  localStorage.removeItem("access_token")
  localStorage.removeItem("refresh_token")
  window.close()
  chrome.runtime.openOptionsPage()
}
