import axios from 'axios'

export const SET_USERS = 'SET_USERS'
export const SET_THREADS = 'SET_THREADS'
export const SET_PETS = 'SET_PETS'
export const SET_ONEPET = 'SET_ONEPET'
export const SET_ONEUSER = 'SET_ONEUSER'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
export const SET_REGISTER_STATUS = 'SET_REGISTER_STATUS'

// const baseURL = 'http://192.168.2.159:3000'
const baseURL = 'http://192.168.43.5:3000'
// const baseURL = 'http://127.0.0.1:3000'

export const loginUser = (user) => {
    return (dispatch) => {
        console.log(user, 'dari action')
        axios
            .post(`${baseURL}/login`, user)
            .then(({ data }) => {
                console.log(data, 'data hasil login')
            }).catch((err) => {
               console.log(err, 'error') 
            });
    }
}

export const setAccessToken = (access_token) => {
    return {
        type: SET_ACCESS_TOKEN,
        payload: access_token
    }
}


export const registerUser = (newUser) => {
    return (dispatch) => {
        axios
            .post(`${baseUrl}/register`, newUser)
            .then(({ data }) => {
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



export const fetchUsers = () => {
    return (dispatch) => {
        axios
            .get(`${baseURL}/users`)
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
                console.log(data)
                dispatch(fetchThreads())
            }).catch((err) => {
                console.log(err, 'masuk error sini')
            });
    }
}

export const createComment = (comment) => {
    console.log(comment)
    return (dispatch) => {
        axios
            .post(`${baseURL}/comment`, comment)
            .then(({ data }) => {
                console.log('berhasil')
                dispatch(fetchThreads())
            }).catch((err) => {
                console.log(err, 'masuk sini')
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
                dispatch(setPets(data.data))
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
        console.log('? ? ? ? ? ? ? ! ! ! ! ! ! ');
        
        axios
            .get(`${baseURL}/users/${userId}`)
            .then(({ data }) => {
                dispatch(setOneUser(data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const addPet = (newPet) => {
    console.log(newPet, '<<<<<');
    
    return (dispatch) => {
        axios({
            method: 'POST',
            url: `${baseURL}/pet`,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        })
            .then(({ data }) => {
                console.log('YESSSS');
                console.log(data);
            })
            .catch(err => {
                console.log('NOOOOOOOOO >>>>');
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