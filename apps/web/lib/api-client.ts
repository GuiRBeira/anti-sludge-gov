// apps/web/lib/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  try {
    const response = await fetch(url, { 
      ...options, 
      headers,
      credentials: "include" // Permite o envio automático do cookie HttpOnly
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
    }

    // Para endpoints que não retornam corpo (ex: DELETE com 204)
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`Fetch error on ${url}:`, error);
    throw error;
  }
}
