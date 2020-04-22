import {
    SET_USER,
    SET_THREADS,
    SET_PETS,
    SET_ONEPET,
    SET_ONEUSER,
    SET_ACCESS_TOKEN,
    SET_REGISTER_STATUS,
    SET_ONE_THREAD,
    SET_CURRENT_USER_DATA,
    SET_USER_THREADS,
    SET_LOADING,
    SET_OWNER
} from '../actions'


const initialState = {
    user:{},
    threads: [],
    pets: [],
    onePet: {},
    oneUser: {},
    thread: {},
    access_token: '',
    register_status: '',
    currentUserData: {},
    user_threads: [],
    isLoading: false,
    owner: {}
}

export const reducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_USER:
            return {
                ...state,
                user: payload
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
        case SET_OWNER:
            return {
                ...state,
                owner: payload
            }
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                access_token: payload
            }
        case SET_REGISTER_STATUS:
            return {
                ...state,
                register_status: payload
            }
        case SET_ONE_THREAD:
            return {
                ...state,
                thread: payload
            }
        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                currentUserData: payload
            }
        case SET_USER_THREADS:
            return {
                ...state,
                user_threads: payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        default:
            return state;
    }
}