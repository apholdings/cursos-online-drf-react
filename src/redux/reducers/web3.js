import {
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_PYTHONS_TOKEN_DATA_SUCCESS,
    LOAD_PYTHONS_TOKEN_DATA_FAIL,
    LOAD_PYTHONS_TOKEN_BALANCE_SUCCESS,
    LOAD_PYTHONS_TOKEN_BALANCE_FAIL,
    LOAD_NETWORK_SUCCESS,
    LOAD_NETWORK_FAIL
} from '../actions/types'

const initialState = {
    account: null,
    network: null,
    token: null,
    token_balance: null
}

export default function web3(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case LOAD_NETWORK_SUCCESS:
            return {
                ...state,
                network: payload
            }
        case LOAD_WEB3_SUCCESS:
            return {
                ...state,
                account: payload
            }
        case LOAD_PYTHONS_TOKEN_DATA_SUCCESS:
            return {
                ...state,
                token: payload
            }
        case LOAD_PYTHONS_TOKEN_BALANCE_SUCCESS:
            return {
                ...state,
                token_balance: payload
            }
        case LOAD_WEB3_FAIL:
            return {
                ...state,
                web3: null
            }
        case LOAD_NETWORK_FAIL:
            return {
                ...state,
                network: null
            }
        case LOAD_PYTHONS_TOKEN_DATA_FAIL:
            return {
                ...state,
                token: null
            }
        case LOAD_PYTHONS_TOKEN_BALANCE_FAIL:
            return {
                ...state,
                token_balance: null
            }

        default:
            return state
    }

}