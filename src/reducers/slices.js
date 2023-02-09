
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page1FormCounter: 1,
  page2FormCounter: 1,
  page3FormCounter: 1
}

const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    setField: (state, action) => {
      const { fieldName, fieldValue } = action.payload
      state[fieldName] = fieldValue
    },
    refresh: (state, action) => {
      return initialState
    }
  }
})

export const { setField } = formSlice.actions
export default formSlice.reducer