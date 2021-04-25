import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import type { RootState, AppDispatch } from "@/store"
import { Dispatch } from "@reduxjs/toolkit"

export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
