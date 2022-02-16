import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { notify } from '../components/loginForm/LoginForm'

type FormState = {
  login: string
  password: string
}

const initialState: FormState = {
  login: '',
  password: '',
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    submit: (state) => {
      if (state.login.length < 4) {
        notify('error', {
          params: {
            title: 'Incorrect login',
            description: 'Login must contain at least 4 characters. ',
            style: {
              multiline: 2,
            },
          },
        })
      }
      if (state.password.length < 4) {
        notify('error', {
          params: {
            title: 'Incorrect password',
            description: 'Password must contain at least 4 characters. ',
            style: {
              multiline: 2,
            },
          },
        })
      }
      notify('success', {
        params: {
          title: 'Welcome again',
          description: 'You have successfully logged in. ',
          style: {
            multiline: 2,
          },
        },
      })
    },
  },
})

export const { updateLogin, updatePassword, submit } = formSlice.actions

export default formSlice.reducer

export const fetchUsers = (dispatch: Dispatch) => {
  setTimeout(() => dispatch(submit()), 2000)
}
