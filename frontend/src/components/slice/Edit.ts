import { createSlice } from "@reduxjs/toolkit";
import type { employe } from "../types/employee.types";
interface EditState {
  edi: employe | null;
}

const initialState: EditState = {
  edi: null
}

const editslice=createSlice({
    name:'edit',
    initialState,
    reducers:{
      
        singleedit:(state,action)=>
        {
           state.edi = action.payload;

        },
           clearedit: (state) => {
      state.edi = null;   
    }
    }
})

export const {singleedit,clearedit}=editslice.actions

export default editslice.reducer