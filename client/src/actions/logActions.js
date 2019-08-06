import {
    GET_LOGS,
    ADD_LOG,
    DELETE_LOG,
    SET_LOADING,
    LOGS_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LOG,
    SEARCH_LOGS,
    CLEAR_FILTER,
} from './types';
import axios from 'axios';

export const getLogs = () => async dispatch => {
    try {
        setLoading()

        const res = await axios.get('/logs/')
        dispatch({
            type: GET_LOGS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        });
    }
}

export const addLog = log => async dispatch => {
    try {
        setLoading()

        const res = await axios.post('/logs/', log)
        dispatch({
            type: ADD_LOG,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        });
    }
}

export const deleteLog = id => async dispatch => {
    try {
        setLoading()

        await axios.delete(`/logs/${id}`)
        dispatch({
            type: DELETE_LOG,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        });
    }
}

export const updateLog = log => async dispatch => {
    try {
        setLoading()

        const res = await axios.put(`/logs/${log._id}`, log)

        dispatch({
            type: UPDATE_LOG,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.data
        });
    }
}

export const searchLogs = text => {
    return {
        type: SEARCH_LOGS,
        payload: text
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

export const setCurrent = log => {
    return ({
        type: SET_CURRENT,
        payload: log
    })
}

export const clearCurrent = () => {
    return ({
        type: CLEAR_CURRENT
    })
}

export const clearFilter = () => {
    return ({
        type: CLEAR_FILTER
    })
}

