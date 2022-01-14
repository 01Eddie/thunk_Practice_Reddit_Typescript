// import axios from 'axios'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = (subreddit: any) => ({
  subreddit,
  type: SELECT_SUBREDDIT
})

export const invalidateSubreddit = (subreddit: any) => ({
  subreddit,
  type: INVALIDATE_SUBREDDIT
})

const requestPosts = (subreddit: any) => ({
  subreddit,
  type: REQUEST_POSTS
})

const receivePosts = (subreddit: any, json: any) => ({
  posts     : json.data.children.map((child: any) => child.data),
  receivedAt: Date.now(),
  subreddit,
  type      : RECEIVE_POSTS
})

const fetchPosts = (subreddit: any) => (dispatch: Function) => {
  dispatch(requestPosts(subreddit))

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state: any, subreddit: any) => {
  const posts = state.postsBySubreddit[subreddit]
  if(!posts)
    return true
  else if(posts.isFetching)
    return false
  else
    return posts.didInvalidate
}

export const fetchPostsIfNeeded = (subreddit: any) => (dispatch: Function, getState: any) => {
  if(shouldFetchPosts(getState(), subreddit))
    return dispatch(fetchPosts(subreddit))
}
