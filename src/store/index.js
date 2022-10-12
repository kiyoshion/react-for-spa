import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import modalReducer from './modalSlice'
import sectionReducer from './sectionSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    section: sectionReducer,
  },
})
