import reducers from "./reducers";

const { createStore } = require("redux");

const store = createStore(reducers)

export default store