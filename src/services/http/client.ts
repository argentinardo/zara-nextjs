function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (value === undefined || value === '') {
    throw new Error(
      `Missing required environment variable: ${key}. Add it to .env.local or define on server enviroment variables`
    )
  }
  return value
}

const API_URL = getRequiredEnv('API_URL')
const API_KEY = getRequiredEnv('API_KEY')

function getConfig(): { baseUrl: string; apiKey: string } {
  return {
    baseUrl: API_URL,
    apiKey: API_KEY,
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const config = getConfig()
  const { baseUrl, apiKey } = config

  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey ?? '',
    ...(options.headers as Record<string, string>),
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  const contentType = response.headers.get('content-type')
  if (contentType?.includes('application/json')) {
    return response.json() as Promise<T>
  }

  return response.text() as unknown as Promise<T>
}

export const httpClient = {
  get<T>(endpoint: string): Promise<T> {
    return request<T>(endpoint, { method: 'GET' })
  },
}
