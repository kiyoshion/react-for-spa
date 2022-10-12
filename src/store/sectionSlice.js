import { createSlice } from '@reduxjs/toolkit'

export const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    currentSection: {
      title: "",
      id: 0,
      parentTitle: ""
    },
  },
  reducers: {
    setCurrentSection: (state, action) => {
      state.currentSection = action.payload
    },
  }
})

export const { setCurrentSection } = sectionSlice.actions

export default sectionSlice.reducer
