import axios from 'axios'

export const SET_USERS = 'SET_USERS'
export const SET_THREADS = 'SET_THREADS'
export const SET_PETS = 'SET_PETS'
export const SET_ONEPET = 'SET_ONEPET'
export const SET_ONEUSER = 'SET_ONEUSER'

// const baseURL = 'http://192.168.2.159:3000'
const baseURL = 'http://192.168.43.5:3000'

export const fetchUsers = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/user`)
            .then(({ data }) => {
                console.log(data)
                dispatch(setUsers(data))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users
    }
}

export const fetchThreads = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/thread`)
            .then(({ data }) => {
                dispatch(setThreads(data))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setThreads = (threads) => {
    return {
        type: SET_THREADS,
        payload: threads
    }
}

export const createThread = (thread) => {
    return (dispatch) => {
        axios
            .post(`${baseURL}/thread`, thread)
            .then(({ data }) => {
                dispatch(fetchThreads())
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setPets = (pets) => {
    return {
        type: SET_PETS,
        payload: pets
    }
}

export const fetchPets = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/pet`)
            .then(({ data }) => {
                dispatch(setPets(data))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setOnePet = (pet) => {
    return {
        type: SET_ONEPET,
        payload: pet
    }
}

export const fetchOnePet = (petId) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/pet/${petId}`)
            .then(({ data }) => {
                dispatch(setOnePet(data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const setOneUser = (user) => {
    return {
        type: SET_ONEUSER,
        payload: user
    }
}

export const fetchOneUser = (userId) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/user/${userId}`)
            .then(({ data }) => {
                dispatch(setOneUser(data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}