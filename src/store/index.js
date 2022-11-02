import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import chapterReducer from './chapterSlice'
import modalReducer from './modalSlice'
import sectionReducer from './sectionSlice'
import materialReducer from './materialSlice'

const combineReducer = combineReducers({
  user: userReducer,
  chapter: chapterReducer,
  modal: modalReducer,
  section: sectionReducer,
  material: materialReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout') {
    state = undefined
  }
  return combineReducer(state, action)
}

export default configureStore({
  reducer: {
    root: rootReducer,
  },
})
