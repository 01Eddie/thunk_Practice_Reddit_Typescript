const Posts = (posts: []) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post.title}</li>
    )}
  </ul>
)

export default Posts
