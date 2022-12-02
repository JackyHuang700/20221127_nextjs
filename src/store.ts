import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import counterReducer from './components/counter/counterSlice'

/** */
export function makeStore(){
  return configureStore({
    reducer: {
      // 註冊模組
      counter: counterReducer,
    },
  })
}

const store = makeStore()


export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
  AppState,
  unknown,
  Action<string>>

export default store