import axios from 'axios'

export const SET_USERS = 'SET_USERS'
export const SET_THREADS = 'SET_THREADS'

export const fetchUsers = () => {
    return (dispatch) => {
        axios
            .get('http://192.168.2.159:3000/user')
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
            .get('http://192.168.2.159:3000/thread')
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
            .post('http://192.168.2.159:3000/thread', thread)
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
            .post('http://192.168.2.159:3000/comment', comment)
            .then(({ data }) => {
                console.log('berhasil')
                dispatch(fetchThreads())
            }).catch((err) => {
                console.log(err, 'masuk sini')
            });
    }
}
