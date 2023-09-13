import * as constants from '../constants/actionTypes';

const reducers = (state = [], action) => {
    switch (action.type) {
        case constants.FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case constants.FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case constants.CREATE:
            return { ...state, posts: [...state.posts, action.payload] };
        case constants.UPDATE:
        case constants.LIKE:
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case constants.DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
}
export default reducers;
