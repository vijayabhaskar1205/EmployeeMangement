import { createSlice, } from "@reduxjs/toolkit";
import type { employe } from "../types/employee.types";
const initialState={
    show:[] as employe[]
    
}
const show=createSlice({
    name:"showemp",
    initialState,
    reducers:{
        allemp:(state,action)=>{
            state.show = [];
       state.show.push(action.payload)
       localStorage.setItem("employee", JSON.stringify(action.payload)); 
        }
    }
})
export const {allemp}=show.actions
export default show.reducer