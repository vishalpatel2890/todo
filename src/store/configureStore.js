import { createStore, compose } from 'redux'
import rootReducer from '../reducers'
import { persistStore, autoRehydrate } from 'redux-persist'

export default function configureStore(initialState) {


  let store = createStore(rootReducer, initialState)
  // let store = compose(autoRehydrate())(createStore)(rootReducer)
  // persistStore(store)

  return store
}
