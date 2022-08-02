import { combineReducers } from 'redux';
import blog from './blog';
import categories from './categories';
import web3 from './web3';
import courses from './courses';

export default combineReducers({
    blog,
    categories,
    web3,
    courses
})