import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMsg = new Error(error.message)
                throw errMsg
            })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errMsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
})

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading())
    return fetch(baseUrl + 'dishes')
        .then((response) => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMsg = new Error(error.message)
                throw errMsg
            })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errMsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
})

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionsLoading())
    return fetch(baseUrl + 'promotions')
        .then((response) => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMsg = new Error(error.message)
                throw errMsg
            })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)))
}

export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
})

export const promotionsFailed = (errMsg) => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMsg
})

export const addPromotions = (promotions) => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading())
    return fetch(baseUrl + 'leaders')
        .then((response) => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
            error => {
                var errMsg = new Error(error.message)
                throw errMsg
            })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errMsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMsg
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId))
    }, 2000)
}

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
})

export const postComment = (comment) => (dispatch) => {
    const newComment = {
        dishId: comment.dishId,
        rating: comment.rating,
        comment: comment.comment,
        author: comment.author,
    }
    newComment.date = new Date().toISOString()
    console.log(newComment)
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(response => {
            setTimeout(() => {
                dispatch(addComment(response))
            }, 2000)
        })
        .catch(error => {
            console.log('Post Comments ', error.message)
            alert('Your comment could not be posted\nError: ' + error.message)
        })
}
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
})