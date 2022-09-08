import { createSlice } from '@reduxjs/toolkit'
import axios from '../lib/axios'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: 0,
      name: ""
    }
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})

export const getUser = () => async (dispatch) => {
  const res = await axios.get('/api/user')
  dispatch(setUser(res.data))
}

export const { setUser } = userSlice.actions

export default userSlice.reducer
