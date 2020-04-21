import axios from 'axios'
import { AsyncStorage } from 'react-native';

export const SET_USER = 'SET_USER'
export const SET_THREADS = 'SET_THREADS'
export const SET_ONE_THREAD = 'SET_ONE_THREAD'
export const SET_PETS = 'SET_PETS'
export const SET_ONEPET = 'SET_ONEPET'
export const SET_ONEUSER = 'SET_ONEUSER'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_REGISTER_STATUS = 'SET_REGISTER_STATUS'
export const SET_CURRENT_USER_DATA = 'SET_CURRENT_USER_DATA'
export const SET_USER_THREADS = 'SET_USER_THREAD'

// const baseURL = 'http://192.168.2.159:3000' 
// const baseURL = 'http://192.168.43.5:3000'
const baseURL = 'http://192.168.1.14:3000'

export const loginUser = (user) => {
    return (dispatch) => {
        console.log(user, 'dari action')
        axios
            .post(`${baseURL}/login`, user)
            .then(({ data }) => {
                const { token, first_name, email, img_url, id, Threads } = data
                dispatch(setAccessToken(token))
                dispatch(setCurrentUserData(data))
                AsyncStorage.setItem('token', token)
                console.log('success login', Threads, '<<<<<<<')
                dispatch(setOneUser(data))
                dispatch(setUserThreads(Threads))
            }).catch((err) => {
                console.log(err, 'error')
            });
    }
}

export const setUserThreads = (threads) => {
    return {
        type: SET_USER_THREADS,
        payload: threads
    }
}

export const setAccessToken = (access_token) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: access_token
    }
}

export const setCurrentUserData = (payload) => {
    return {
        type: SET_CURRENT_USER_DATA,
        payload: payload
    }
}


export const registerUser = (newUser) => {
    return (dispatch) => {
        axios
            .post(`${baseURL}/register`, newUser)
            .then(({ data }) => {
                console.log('success register')
                dispatch(setRegister('success'))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setRegister = (status) => {
    return {
        type: SET_REGISTER_STATUS,
        payload: status
    }
}


export const fetchUser = (id) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/users/${id}`)
            .then(({ data }) => {
                console.log(data)
                dispatch(setUser(data))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const fetchThreads = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/threads`)
            .then(({ data }) => {
                const threads = data.data
                dispatch(setThreads(threads))
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

export const fetchOneThread = (id) => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/threads/${id}`)
            .then(({ data }) => {
                const thread = data.data
                dispatch(setOneThread(thread))
                console.log(data, 'thread')
            }).catch((err) => {
                console.log(err)
            });
    }
}


export const setOneThread = (thread) => {
    return {
        type: SET_ONE_THREAD,
        payload: thread
    }
}


export const createThread = (thread, token) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${baseURL}/threads`,
            headers: {
                token
            },
            data: thread

        }).then(({ data }) => {
            dispatch(fetchThreads())
        }).catch((err) => {
            console.log(err)
        });
    }
}

export const createComment = (comment, token) => {
    console.log(comment)
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${baseURL}/threads/${comment.ThreadId}`,
            headers: {
                token
            },
            data: {
                message: comment.message
            }

        }).then(({ data }) => {
            dispatch(fetchOneThread(comment.ThreadId))
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

export const fetchPets = (token) => {
    return (dispatch) => {
        console.log(token, '< < < token');
        axios({
            method: 'GET',
            url: `${baseURL}/pet`,
            headers: {
                token
            }
        })
            .then(({ data }) => {
                dispatch(setPets(data.data))
            })
            .catch((err) => {
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

export const fetchOnePet = (petId, token) => {
    return (dispatch) => {
        console.log('sinih');
        axios({
            method: 'GET',
            url: `${baseURL}/pet/${petId}`,
            headers: {
                token
            }
        })
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
        console.log('USER ID FETCH ONE USER => ', userId);
        console.log('halo????');
        axios
            .get(`${baseURL}/users/${userId}`)
            .then(({ data }) => {
                console.log('AAAAAAAA ****');
                dispatch(setOneUser(data))
            })
            .catch(err => {
                console.log('ERRRRROORRRR - - - - - - -');
                console.log(err)
            })
    }
}

export const addPet = (newPet, token) => {
    console.log(newPet)
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${baseURL}/pet`,
            headers: {
                token
            },
            data: newPet
        })
            .then(({ data }) => {
                console.log('fetched', data);
                dispatch(fetchPets(token));
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deletePet = (petId) => {
    console.log('>>>>>???', petId);

    return (dispatch) => {
        axios
            .delete(`${baseURL}/pet/${petId}`)
            .then(({ data }) => {
                console.log('deleted successfully', data);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const updateRequest = (petId, token) => {
    return (dispatch) => {
        console.log('PET ID = ', petId);
        console.log('PET TOKEN = ', token);
        console.log('= = = = = UPDATE REQ = = = = = =');

        axios({
            method: 'PATCH',
            url: `${baseURL}/pet/${petId}`,
            headers: {
                token
            }
        })
            .then(({ data }) => {
                dispatch(fetchPets(token));
            })
            .catch(err => {
                console.log('ERROR DI UPDATE REQ');
                console.log(err);
            })
    }
}

export const reqStatusUp = (threadId) => {
    return (dispatch) => {
        axios
            .put(`${baseURL}/threads/statusRequested/${threadId}`)
            .then(({ data }) => {
                console.log('status requested')
                dispatch(fetchThreads())
            }).catch((err) => {
                console.log(err)
            });
    }
}