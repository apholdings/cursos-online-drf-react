import { combineReducers } from 'redux';
import blog from './blog';
import categories from './categories';
import web3 from './web3';

export default combineReducers({
    blog,
    categories,
    web3
})