import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// API requests
import { Api } from '../shared/utils/api';
import { Oauth2 } from '../shared/utils/oauth2';

// Normally use this if there were multiple reducers.
import reducers from './combinedReducers';

export const setupStore = () => createStore(reducers, applyMiddleware(thunk.withExtraArgument({ Api, Oauth2 })));
