import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootReducer, rootEpic } from './root'

const configureStore = (initialState) => {
  const epicMiddleware = createEpicMiddleware({ dependencies: {} })
  const composeEnhancers =
    (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  )
  epicMiddleware.run(rootEpic)
  return store
}

export default configureStore
