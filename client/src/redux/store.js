import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
    key: 'sess',
    storage,
    // stateReconciler: autoMergeLevel2,
    whitelist: ['session'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );
    let persistor = persistStore(store);
    return { store, persistor };
};
