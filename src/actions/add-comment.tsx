import { ACTION_TYPE } from "./action-types"

export const addComment = (commentId) => ({
    type: ACTION_TYPE.ADD_COMMENT,
    payload: commentId
})
