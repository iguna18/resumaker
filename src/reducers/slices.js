
import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {
    1:[],
    2:[],
    3:[],
    other:{
      page2groupCounter:1,
      page3groupCounter:1      
    }
  },
  reducers: {
    setField: (state, action) => {
      const { fieldName, fieldValue, pageid, index } = action.payload
      state[pageid][index][fieldName] = fieldValue
    },
    setOtherField: (state, action) => {
      const { fieldName, fieldValue} = action.payload;
      state['other'][fieldName] = fieldValue
    },
    addGroup: (state, action) => {
      const { pageid, index } = action.payload;
      if(!state[pageid][index]) {
        state[pageid][index] = {}
      }
    },
    increaseGroupCounter: (state, action) => {
      const { pageid } = action.payload;
      state.other[`page${pageid}groupCounter`] += 1
    }
  },
});

export const { setField, addGroup, setOtherField, increaseGroupCounter } = formSlice.actions;
export default formSlice.reducer;

export const addGroupThunk = (pageid, index) => async (dispatch, getState) => {
  dispatch(addGroup({pageid, index}))
}

export const setFieldThunk = (payload) => async (dispatch, getState) => {
  console.log(getState());
  dispatch(setField(payload))
  console.log(getState());
}
