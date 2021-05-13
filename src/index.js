import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import App from 'components/App'
import configureStore from 'store/configureStore'
import { LOAD_SUDOKU } from 'store/sudoku'

import './index.css'

const initialState = window.___INITIAL_STATE___
const store = configureStore(initialState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
const testSudoku = [
  ...[0, 7, 2, 0, 0, 9, 0, 0, 0],
  ...[0, 3, 0, 6, 0, 0, 4, 0, 0],
  ...[0, 0, 1, 0, 0, 0, 0, 8, 7],
  ...[1, 0, 0, 0, 0, 0, 7, 0, 0],
  ...[9, 0, 0, 2, 0, 3, 0, 0, 0],
  ...[0, 0, 0, 0, 0, 0, 0, 0, 6],
  ...[0, 0, 0, 3, 0, 0, 5, 6, 0],
  ...[0, 0, 0, 0, 0, 4, 9, 0, 0],
  ...[0, 0, 0, 0, 1, 8, 0, 0, 2]
]
store.dispatch({ type: LOAD_SUDOKU, values: testSudoku })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
