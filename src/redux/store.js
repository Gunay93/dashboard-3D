import { configureStore } from '@reduxjs/toolkit'
import designersReducer from './designer/designersSlice'
import objectsReducer from './object/objectsSlice'

export const store = configureStore({
  reducer: {
    designers: designersReducer,
    objects: objectsReducer,
  },
})