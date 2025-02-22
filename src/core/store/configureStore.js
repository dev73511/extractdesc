import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';

// DEFAULT STATE
import {
    HOME_DEFAULT_STATE
} from "./defaultState";

//Reducer
import { reducer as homeReducer } from "@/core/ducks/home";

//Saga
import { fetchDescriptionSaga } from "@/core/ducks/homeSaga";

const appReducer = combineReducers({
    home: homeReducer,
})

const rootReducer = (state, action) => {
    state = {
        ...state,
        home: HOME_DEFAULT_STATE,
    }
    return appReducer(state, action)
}

const sagaMiddleWare = createSagaMiddleware();
const middleware = [sagaMiddleWare];

const enhancer = applyMiddleware(...middleware);


const store = createStore(rootReducer, {}, enhancer);

function*    rootSaga() {
    yield all([
        fork(fetchDescriptionSaga),
    ])
}

sagaMiddleWare.run(rootSaga);

export default store