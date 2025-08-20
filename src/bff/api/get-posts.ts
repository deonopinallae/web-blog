import { transformPost } from '../transformers'
export const getPosts = async () =>
    fetch(`http://localhost:3000/posts`)
        .then((loadedPosts) => loadedPosts.json())
        .then((loadedPosts) => loadedPosts && loadedPosts.map(transformPost))
