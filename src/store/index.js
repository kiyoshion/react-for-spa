import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import modalReducer from './modalSlice'
import sectionReducer from './sectionSlice'
import materialReducer from './materialSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    section: sectionReducer,
    material: materialReducer,
  },
})
