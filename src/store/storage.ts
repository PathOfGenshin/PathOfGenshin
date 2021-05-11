import createWebStorage from "redux-persist/lib/storage/createWebStorage"
import { WebStorage } from "redux-persist/lib/types"

// This is necessary to avoid Next.js console from logging:
// "redux-persist failed to create sync storage. falling back to noop storage."
// when developing the app locally.
const createNoopStorage = (): WebStorage => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem(_key: string): Promise<string | null> {
      return Promise.resolve(null)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setItem(_key: string, _value: string): Promise<void> {
      return Promise.resolve()
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem(_key: string): Promise<void> {
      return Promise.resolve()
    },
  }
}

export const storage: WebStorage =
  typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage()
