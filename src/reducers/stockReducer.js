import { categoryConstants } from "../actions/constants.js";

const initState = {
    stocks: [],
    loading: false,
    error: null
};

export default (state = initState, action) => {
    switch (action.type) {
        case "GET_ALL_STOCKS_REQUEST" :
            state = {
                ...state,
                loading: true
            }
            break;
        case "GET_ALL_STOCKS_SUCCESS" :
            state = {
                ...state,
                stocks: action.payload.stocks
            }
            break;
        case "GET_ALL_STOCKS_FAILED" :
            state = {
                ...state,
                err: action.payload.error
            }
            break;
    }
    return state;
}


