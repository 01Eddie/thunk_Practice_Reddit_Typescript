import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/actions'

const selectedSubreddit = (state = 'reactjs', action: { type: any; subreddit: any }) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = {
  didInvalidate: false,
  isFetching   : false,
  items        : []
}, action: { type: any; posts: []; receivedAt: any }) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching   : true
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: false,
        isFetching   : false,
        items        : action.posts,
        lastUpdated  : action.receivedAt
      })
    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action: { type: any; posts: []; receivedAt: any}) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer
