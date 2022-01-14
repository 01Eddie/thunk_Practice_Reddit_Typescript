import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
  constructor(props: any) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentDidUpdate(prevProps: any) {
    if(this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit: any) {
    this.props.dispatch(selectSubreddit(nextSubreddit))
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit))
  }

  handleRefreshClick(e: any) {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props

    return (
      <div>
        <Picker
          onChange={this.handleChange}
          options={[ 'reactjs', 'frontend' ]}
          value={selectedSubreddit} />
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a
              href='/'
              onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}

AsyncApp.propTypes = {
  dispatch         : PropTypes.func.isRequired,
  isFetching       : PropTypes.bool.isRequired,
  lastUpdated      : PropTypes.number,
  posts            : PropTypes.array.isRequired,
  selectedSubreddit: PropTypes.string.isRequired
}

function mapStateToProps(state: any) {
  const { selectedSubreddit, postsBySubreddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items     : []
  }

  return {
    isFetching,
    lastUpdated,
    posts,
    selectedSubreddit
  }
}

export default connect(mapStateToProps)(AsyncApp)
