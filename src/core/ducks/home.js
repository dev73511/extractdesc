const { HOME_DEFAULT_STATE } = require("../store/defaultState");

export const types = {
    FETCH_DESCRIPTION_REQUEST: 'HOME/FETCH_DESCRIPTION_REQUEST',
    FETCH_DESCRIPTION_SUCCESS: 'HOME/FETCH_DESCRIPTION_SUCCESS',
    FETCH_DESCRIPTION_FAILURE: 'HOME/FETCH_DESCRIPTION_FAILURE',
    CLEAR_DESCRIPTION_RESPONSE: 'HOME/CLEAR_DESCRIPTION_RESPONSE',
}

export const reducer = (state = HOME_DEFAULT_STATE, action) => {
    switch (action.type){
        case types.FETCH_DESCRIPTION_REQUEST: 
            return {
                ...state,
                loadingDescription: true,
                descriptionResponse: null,
                descriptionError: null,
            }
        case types.FETCH_DESCRIPTION_SUCCESS: 
            return {
                ...state,
                loadingDescription: false,
                descriptionResponse: action.payload,
            }
        case types.FETCH_DESCRIPTION_FAILURE: 
            return {
                ...state,
                loadingDescription: false,
                descriptionError: action.payload,
            }
        case types.CLEAR_DESCRIPTION_RESPONSE: 
            return {
                ...state,
                loadingDescription: false,
                descriptionResponse: {},
                descriptionError: null,
            }
        default:
            return state;
    }
}

export const actions = {
    fetchDescription(payload){
        return {
            type: types.FETCH_DESCRIPTION_REQUEST,
            payload
        }
    },
    fetchDescriptionSuccess(payload){
        return {
            type: types.FETCH_DESCRIPTION_SUCCESS,
            payload
        }
    },
    fetchDescriptionFailure(error){
        return {
            type: types.FETCH_DESCRIPTION_FAILURE,
            payload: error
        }
    },
    clearFetchDescriptionResponse(){
        return{
            type: types.CLEAR_DESCRIPTION_RESPONSE,
        }
    }
}