import {
    SET_USERS,
    SET_THREADS,
    SET_PETS,
    SET_ONEPET,
    SET_ONEUSER,
} from '../actions'


const initialState = {
    users: [],
    threads: [],
    pets: [],
    onePet: {},
    oneUser: {},
}

export const reducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_USERS:
            return {
                ...state,
                users: payload
            }
        case SET_THREADS:
            return {
                ...state,
                threads: payload
            }
        case SET_PETS:
            return {
                ...state,
                pets: payload
            }
        case SET_ONEPET:
            return {
                ...state,
                onePet: payload
            }
        case SET_ONEUSER:
            return {
                ...state,
                oneUser: payload
            }
        default:
            return state;
    }
}