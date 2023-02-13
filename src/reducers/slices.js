
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
      const { fieldName, fieldValue, localStorageFlag } = action.payload
      state[fieldName] = fieldValue
      if(localStorageFlag)
        localStorage.setItem(`resumaker_${fieldName}`, fieldValue)
    },
    refresh: (state, action) => {
      for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i)
        if(!key.startsWith('resumaker_')) continue

        localStorage.removeItem(key)
      }  
      return initialState
    }
  }
})

export const { setField, refresh } = formSlice.actions
export default formSlice.reducer