import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("designers")) || {
  list: [
    { id: 1, fullName: "Alice Johnson", workingHours: "9-6", avatar: "https://i.pravatar.cc/350?img=32" },
    { id: 2, fullName: "Bob Smith", workingHours: "10-7", avatar: "https://i.pravatar.cc/350?img=12" },
    { id: 3, fullName: "Charlie Davis", workingHours: "8-5", avatar: "https://i.pravatar.cc/350?img=45" },
  ],
}

export const designersSlice = createSlice({
  name: "designers",
  initialState,
  reducers: {
    addDesigner: (state, action) => {
      state.list.push(action.payload)
      localStorage.setItem("designers", JSON.stringify(state))
    },
  },
})

export const { addDesigner, selectDesigner } = designersSlice.actions
export default designersSlice.reducer