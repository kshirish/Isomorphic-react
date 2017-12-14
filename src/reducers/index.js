import { combineReducers } from 'redux';

import main from './main';
import detail from './detail';

const reducer = combineReducers({
	main,
	detail
});

export default reducer;