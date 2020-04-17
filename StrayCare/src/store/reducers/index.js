import { 
    SET_USERS,
    SET_THREADS
} from '../actions'


const initialState = {
    users: [],
    threads: []
}

export const reducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_USERS:
            return {
                ...state,
                users : payload
            }
        case SET_THREADS:
            return {
                ...state,
                threads : payload
            }
        default:
            return state;
    }
}