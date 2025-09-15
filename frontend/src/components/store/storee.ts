import {configureStore,combineReducers} from '@reduxjs/toolkit'
import show from '../slice/show'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import editslice from '../slice/Edit'
const rootreducer=combineReducers({
    showemp:show,
    edit:editslice
})
const persistConfig = {
  key: "root",
  storage,
  whitelist:["showemp","edit"]
};
const persistedReducer = persistReducer(persistConfig, rootreducer);
export const storee=configureStore({
    reducer:persistedReducer
    
})
export const persistor = persistStore(storee);