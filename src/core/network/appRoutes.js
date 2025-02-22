const { isNetworkConnected } = require("@/util/common_functions");
const axios = require("axios");
const store = require("@/core/store/configureStore")

const webApiRequest = async(endpoint, payload, method, authToken) => {
    try {
        let res = await axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_API_BASE_URL + endpoint,
            headers: {
                Accept: 'application/json'
            },
            data: JSON.stringify(payload)
        })
        
        return JSON.stringify(res?.data);
    } catch (error) {
        if(error?.response?.data?.httpCode && error?.response?.data?.httpCode?.toString() == '401'){
            return JSON.stringify({
                errorCode: '',
                errorMessage: 'Response Error'
            })
        }
        return JSON.stringify(e?.response?.data)
    }
}

async function makeAPIRequest(payload, endpoint, authToken, httpMethod) {
    const isConnectionActive = isNetworkConnected();
    if(!isConnectionActive){
        return JSON.stringify({
            errorCode: '',
            errorMessage: 'No internet connection'
        })
    }else{
        let method = httpMethod === null || httpMethod === undefined ? '' : httpMethod
        try {
            let response = await webApiRequest(endpoint, payload, method, authToken)
            if(
                JSON.parse(response)?.httpCode &&
                JSON.parse(response)?.httpCode?.toString() == '401'
            ){
                return JSON.stringify({errorCode: '', errorMessage: 'Response Error'})
            }
            return response
        } catch (error) {
            
        }
    }
}

export {makeAPIRequest}