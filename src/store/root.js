import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import ui, { epics as uiEpics } from './ui'
import sudoku, { epics as sudokuEpics } from './sudoku'
import toggle, { epics as toggleEpics } from './toggle'

export const rootEpic = combineEpics(uiEpics, sudokuEpics, toggleEpics)
const appReducer = combineReducers({ ui, sudoku, toggle })

export const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return appReducer(state, action)
}
