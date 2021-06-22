import axios from "axios"
import { QueryClient } from "react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
})
export const client = axios.create()
