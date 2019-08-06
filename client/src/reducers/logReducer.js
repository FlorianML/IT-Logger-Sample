import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR,
    ADD_LOG,
    DELETE_LOG,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LOG,
    SEARCH_LOGS,
    CLEAR_FILTER
} from '../actions/types'

const initialState = {
    logs: null,
    filtered: null,
    current: null,
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_LOG:
            return {
                ...state,
                logs: [...state.logs, action.payload],
                loading: false
            }
        case DELETE_LOG:
            return {
                ...state,
                logs: state.logs.filter(log => log._id !== action.payload),
                loading: false
            }
        case UPDATE_LOG:
            return {
                ...state,
                logs: state.logs.map(log => log._id === action.payload._id ? action.payload : log)
            }
        case GET_LOGS:
            return {
                ...state,
                logs: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SEARCH_LOGS:
            return {
                ...state,
                filtered: state.logs.filter((log) => log.message.toLowerCase().includes(action.payload.toLowerCase()))
                //state.logs.filter(log => {
                //     const regex = new RegExp(`${action.payload}`, 'gi');
                //     return log.message.match(regex);
                // })
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case LOGS_ERROR:
            console.error(action.payload)
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}