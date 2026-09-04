

import { configureStore } from '@reduxjs/toolkit'
import agentSlice from './agentSlice'
import chatSlice from './chatSlice'
import customerSlice from './customerSlice'
import  knowledgeBaseSlice from './knowledgebaseSlice'
import sessionSlice from './sessionSlice'

export const store = configureStore({
  reducer: {
    agent:agentSlice,
      chat:chatSlice,
      customer:customerSlice,
      knowledgeBase:knowledgeBaseSlice,
      session:sessionSlice
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store