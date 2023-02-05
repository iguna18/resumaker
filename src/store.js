
import formReducer from './reducers/slices'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    form: formReducer
  }
})