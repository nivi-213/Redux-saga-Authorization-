
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import signupReducer from '../redux/authSlice';
import rootSaga from '../redux/Saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(signupReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
