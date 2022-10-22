import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import chapterReducer from './chapterSlice'
import modalReducer from './modalSlice'
import sectionReducer from './sectionSlice'
import materialReducer from './materialSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chapter: chapterReducer,
    modal: modalReducer,
    section: sectionReducer,
    material: materialReducer,
  },
})
