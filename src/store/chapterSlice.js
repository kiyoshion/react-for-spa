import { createSlice } from '@reduxjs/toolkit'

export const chapterSlice = createSlice({
  name: 'chapter',
  initialState: {
    currentChapter: {
      title: "",
      id: 0,
      contentTitle: ""
    },
  },
  reducers: {
    setCurrentChapter: (state, action) => {
      state.currentChapter = action.payload
    },
  }
})

export const { setCurrentChapter } = chapterSlice.actions

export default chapterSlice.reducer
