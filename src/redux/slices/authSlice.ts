import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AuthState {
    username: string | null
}

// Define the initial state using that type
const initialState: AuthState = {
    username: null
}

export const authSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        logoutUser: state => {
            state.username = null
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions

export default authSlice.reducer