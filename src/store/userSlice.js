import { createSlice } from '@reduxjs/toolkit'
import axios from '../lib/axios'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {
      id: 0,
      name: "",
      avatar: "",
    },
    isLogined: false,
    logout: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    },
    setIsLogined: (state, action) => {
      state.isLogined = action.payload
    },
    logout: (state, action) => {
      return
    }
  }
})

export const getUser = () => async (dispatch) => {
  const res = await axios.get('/api/user')
  dispatch(setUser(res.data))
}

export const csrf = () => async (dispatch) => {
  const res = await axios.get('/sanctum/csrf-cookie')
  res.data ? dispatch(setIsLogined(true)) : dispatch(setIsLogined(false))
}

export const { setUser, setIsLogined, logout } = userSlice.actions

export default userSlice.reducer
