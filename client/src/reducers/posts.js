import * as constants from '../constants/actionTypes';

const reducers = (posts = [], action) => {
    switch (action.type) {
        case constants.FETCH_ALL:
            return action.payload;
        case constants.CREATE:
            return [ ...posts, action.payload ];
        case constants.UPDATE:
        case constants.LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case constants.DELETE:
            return posts.filter((post) => post._id !== action.payload._id);
        default:
            return posts;
    }
}
export default reducers;
