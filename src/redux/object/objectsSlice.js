import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem("objects")) || {
  items: [{
    id: 1,
    name: "Sample Object",
    attachedDesigner: 1,
    color: "#ed1db5",
    position: [-5.5, 1, 0],
    size: "normal"
  }, {
    id: 2,
    name: "Sample Object 2",
    attachedDesigner: 2,
    color: "#1dedca",
    position: [-0.5, 1, 0],
    size: "normal"
  }, {
    id: 3,
    name: "Sample Object 2",
    attachedDesigner: 3,
    color: "#637abf",
    position: [4.5, 1, 0],
    size: "normal"
  }],
};

const objectsSlice = createSlice({
  name: 'objects',
  initialState,
  reducers: {
    addObject: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("objects", JSON.stringify(state));
    },
    updateObject: (state, action) => {
      const { id, changes } = action.payload;
      const index = state.items.findIndex(obj => obj.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...changes };
        localStorage.setItem("objects", JSON.stringify(state));
      }
    },
    unassignDesignerObjects: (state, action) => {
      state.items = state.items.map((obj) =>
        obj.attachedDesigner === action.payload
          ? {
            ...obj,
            attachedDesigner: null,
          }
          : obj
      );
      localStorage.setItem(
        "objects",
        JSON.stringify(state)
      );
    },
  },
});

export const { addObject, updateObject, unassignDesignerObjects } = objectsSlice.actions;

export default objectsSlice.reducer;
