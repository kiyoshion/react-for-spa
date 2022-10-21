import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    openOutputModal: false,
    avatarModal: false,
    croppedModal: false,
    joinTopicModal: false,
    flashModal: {
      isOpen: false,
      side: '',
      flash: {}
    },
  },
  reducers: {
    setOpenOutputModal: (state, action) => {
      state.openOutputModal = action.payload
    },
    setAvatarModal: (state, action) => {
      state.avatarModal = action.payload
    },
    setCroppedModal: (state, action) => {
      state.croppedModal = action.payload
    },
    setJoinTopicModal: (state, action) => {
      state.joinTopicModal = action.payload
    },
    setFlashModal: (state, action) => {
      state.flashModal = action.payload
    },
  }
})

export const { setOpenOutputModal, setAvatarModal, setFlashModal, setJoinTopicModal } = modalSlice.actions

export default modalSlice.reducer
