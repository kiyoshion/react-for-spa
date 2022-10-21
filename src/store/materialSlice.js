import { createSlice } from '@reduxjs/toolkit'

export const materialSlice = createSlice({
  name: 'material',
  initialState: {
    currentMaterial: {}
  },
  reducers: {
    setCurrentMaterial: (state, action) => {
      state.currentMaterial = action.payload
    },
  }
})

export const { setCurrentMaterial } = materialSlice.actions

export default materialSlice.reducer
