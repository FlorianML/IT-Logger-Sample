import {
    GET_TECHS,
    SET_LOADING,
    TECHS_ERROR,
    ADD_TECH,
    DELETE_TECH
} from './types';
import axios from 'axios';

export const getTechs = () => async dispatch => {
    try {
        setLoading()
        const res = await axios.get('/techs/')
        dispatch({
            type: GET_TECHS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.data
        });
    }
}

export const addTech = tech => async dispatch => {
    try {
        setLoading()
        const res = await axios.post('/techs/', tech)
        dispatch({
            type: ADD_TECH,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.data
        });
    }
}

export const deleteTech = id => async dispatch => {
    try {
        setLoading()

        await axios.delete(`/techs/${id}`)
        dispatch({
            type: DELETE_TECH,
            payload: id
        });
    } catch (error) {
        dispatch({
            type: TECHS_ERROR,
            payload: error.response.data
        });
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}