import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    openOutputModal: false,
  },
  reducers: {
    setOpenOutputModal: (state, action) => {
      console.log(state, action)
      state.openOutputModal = action.payload
    },
  }
})

export const { setOpenOutputModal } = modalSlice.actions

export default modalSlice.reducer
