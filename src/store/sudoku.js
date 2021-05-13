import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import _ from 'underscore'
import { getSelected, getPencilMode } from 'store/ui'

// constants
export const LOAD_SUDOKU = 'sudoku/LOAD_SUDOKU'
export const UPDATE_VALUES = 'sudoku/UPDATE_VALUES'
export const SET_VALUE = 'sudoku/SET_VALUE'
export const SET_CORNER = 'sudoku/SET_CORNER'
export const SET_CENTER = 'sudoku/SET_CENTER'
export const SET_COLOR = 'sudoku/SET_COLOR'
export const SET_PENCIL_MARK = 'sudoku/SET_PENCIL_MARK'

// actions
export const loadSudoku = (values) => ({ type: LOAD_SUDOKU, values })
export const updateValues = (value) => ({ type: UPDATE_VALUES, value })
const setValue = (index, value) => ({ type: SET_VALUE, index, value })
const setCorner = (index, value) => ({ type: SET_CORNER, index, value })
const setCenter = (index, value) => ({ type: SET_CENTER, index, value })
const setColor = (index, value) => ({ type: SET_COLOR, index, value })

// selector
export const getCellData = (state, index) => (state.sudoku[index] ? state.sudoku[index] : 0)
export const getRow = (index, state) => {
  const i = index * 9
  return state.sudoku.start.slice(i, i + 9)
}

// epics
export const epics = combineEpics((action$, state$) =>
  action$.pipe(
    ofType(UPDATE_VALUES),
    map(({ value }) => ({
      selected: getSelected(state$.value),
      mode: getPencilMode(state$.value),
      value
    })),
    mergeMap(({ selected, mode, value }) => {
      switch (mode) {
        case 'normal':
          return _.map(Object.keys(selected), (index) => setValue(index, value))
        case 'corner':
          return _.map(Object.keys(selected), (index) => setCorner(index, value))
        case 'center':
          return _.map(Object.keys(selected), (index) => setCenter(index, value))
        case 'color':
          return _.map(Object.keys(selected), (index) => setColor(index, value))
      }
    })
  )
)

// reducer
const setPencilMarks = (state, mode, index, value) => ({
  ...state,
  [index]: {
    ...state[index],
    [mode]: state[index][mode]
      ? _.chain([...state[index][mode], value])
          .unique()
          .first(8)
          .value()
      : [value]
  }
})

const initialState = {}
export const reducer = (state = initialState, { type, index, value, values }) => {
  switch (type) {
    case LOAD_SUDOKU: {
      return _.object(
        _.range(values.length),
        _.map(values, (given, index) => ({ index, given }))
      )
    }
    case SET_VALUE: {
      return { ...state, [index]: { ...state[index], value } }
    }
    case SET_CORNER: {
      return value !== undefined
        ? setPencilMarks(state, 'corner', index, value)
        : { ...state, [index]: { ...state[index], corner: value } }
    }
    case SET_CENTER: {
      return value !== undefined
        ? setPencilMarks(state, 'center', index, value)
        : { ...state, [index]: { ...state[index], center: value } }
    }
    case SET_COLOR: {
      return { ...state, [index]: { ...state[index], color: value } }
    }
    default:
      return state
  }
}

export default reducer