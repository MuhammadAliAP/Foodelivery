import thunk from "redux-thunk";
import reducers from "./reducers";

// const { createStore } = require("redux");
import { legacy_createStore as createStore, applyMiddleware } from 'redux'

const Store = createStore(reducers, applyMiddleware(thunk))

const getToken = () => Store?.getState()?.generalState?.token

export  { Store, getToken }