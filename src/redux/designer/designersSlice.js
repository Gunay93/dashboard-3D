import { createSlice } from "@reduxjs/toolkit"
const savedDesigners = localStorage.getItem("designers");
const initialState = savedDesigners
  ? JSON.parse(savedDesigners) : {
    list: [
      { id: 1, fullName: "Günay Cabbarlı", workingHours: "9-6", status: 'active', avatar: "https://i.pravatar.cc/350?img=32" },
      { id: 2, fullName: "Aysel Mammadli", workingHours: "10-7", status: 'active', avatar: "https://i.pravatar.cc/350?img=12" },
      { id: 3, fullName: "Havva Ergün", workingHours: "8-5", status: 'deactive', avatar: "https://i.pravatar.cc/350?img=45" },
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
    removeDesigner: (state, action) => {
      state.list = state.list.filter(
        (d) => d.id !== action.payload
      );
      localStorage.setItem(
        "designers",
        JSON.stringify(state)
      );
    },
  },
})

export const { addDesigner, removeDesigner, selectDesigner } = designersSlice.actions
export default designersSlice.reducer