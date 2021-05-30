import axios from "axios"
import { QueryClient } from "react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
export const client = axios.create()
