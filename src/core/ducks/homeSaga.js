import { call, put, takeLatest } from "redux-saga/effects"
import {types, actions} from "./home"
import { makeAPIRequest } from "../network/appRoutes"
import config from "../network/appConfig"

function* fetchDescription(action){
    try {
        const payload = action.payload
        const requestBody = {
            data: payload
        }
        let response = ""
        if(payload){
            response = yield call(makeAPIRequest, requestBody, config.service.fetch_description)
        }

        if(response && JSON.parse(response)){
            yield put(actions.fetchDescriptionSuccess(JSON.parse(response)))
        }else{
            yield put(actions.fetchDescriptionFailure({
                errorCode: '',
                errorMessage: 'Technical error, please try again later'
            }))
        }

    } catch (error) {
        yield put(actions.fetchDescriptionFailure({
            errorCode: '',
            errorMessage: 'Request Failed'
        }))
    }
}

export function* fetchDescriptionSaga() {
    yield takeLatest(types.FETCH_DESCRIPTION_REQUEST, fetchDescription);
}