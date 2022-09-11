import { createSlice } from '@reduxjs/toolkit'
import axios from '../lib/axios'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: 0,
      name: ""
    },
    isLogined: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setIsLogined: (state, action) => {
      state.isLogined = action.payload
    }
  }
})

export const getUser = () => async (dispatch) => {
  const res = await axios.get('/api/user')
  dispatch(setUser(res.data))
}

export const csrf = () => async (dispatch) => {
  const res = await axios.get('/sanctum/csrf-cookie')
  console.log(res.data)
  res.data ? dispatch(setIsLogined(true)) : dispatch(setIsLogined(false))
}

export const { setUser, setIsLogined } = userSlice.actions

export default userSlice.reducer
