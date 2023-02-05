
import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
  name: 'form',
  initialState: {},
  reducers: {
    updateField: (state, action) => {
      const { fieldName, value } = action.payload;
      state[fieldName] = value;
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;

