import { combineReducers } from "redux";
import loginReducer from './login.reducer'
import userReducer from "./user.reducer";

export default combineReducers({
    loginReducer,
    userReducer
})