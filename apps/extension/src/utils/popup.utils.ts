import type { PageInfo } from "../background"

export const nowSeconds = () => Math.floor(Date.now() / 1000)

export const formatUrl = (url: string): string => {
  try {
    const parsed = new URL(url)
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "")
  } catch {
    return url
  }
}

export const getPageDuration = (page: PageInfo): string => {
  const end = page.endTime || nowSeconds()
  const durationSec = Math.max(0, end - page.startTime)
  const minutes = Math.floor(durationSec / 60)
  const seconds = durationSec % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

export const formatTimer = (startTime: number): string => {
  const elapsed = Math.max(0, nowSeconds() - startTime)
  const mins = Math.floor(elapsed / 60).toString().padStart(2, "0")
  const secs = (elapsed % 60).toString().padStart(2, "0")
  return `${mins}:${secs}`
}
