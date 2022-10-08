import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, combineReducers } from 'redux';
import UserReducer from './reducers/UserReducer';
import { Provider } from 'react-redux';

const reducers = combineReducers({
	user: UserReducer,
});
const store = createStore(reducers);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
