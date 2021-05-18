import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap, filter } from 'rxjs/operators'
import _ from 'underscore'
import { getSelected, getPencilMode, selectCell, clearSelected } from 'store/ui'

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
export const getCellValue = (state, index) =>
  state.sudoku[index] ? state.sudoku[index].given || state.sudoku[index].value : 0
export const getCellData = (state, index) => (state.sudoku[index] ? state.sudoku[index] : 0)
export const getCellsForValues = (state, value) =>
  _.chain(state.sudoku)
    .filter((cell) => cell.given === value || cell.value === value)
    .map((cell) => cell.index)
    .value()

// epics
export const epics = combineEpics(
  (action$, state$) =>
    action$.pipe(
      ofType(UPDATE_VALUES),
      map(({ value }) => ({
        mode: getPencilMode(state$.value),
        value
      })),
      filter(({ mode, value }) => mode === 'show'),
      mergeMap(({ value }) => {
        const toSelect = getCellsForValues(state$.value, value)
        const actions = [
          clearSelected(),
          ...(value !== undefined ? _.map(toSelect, (index) => selectCell(index, value)) : [])
        ]
        return actions
      })
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(UPDATE_VALUES),
      map(({ value }) => ({
        mode: getPencilMode(state$.value),
        value
      })),
      filter(({ mode, value }) => mode === 'find'),
      mergeMap(({ value }) => {
        const toSelect = _.chain(_.range(0, 9))
          .map((box) => getPossibleCells(state$.value, box, value))
          // .filter((ids) => ids.length <= 2)
          .flatten()
          .unique()
          .value()
        const actions = [
          clearSelected(),
          ...(value !== undefined ? _.map(toSelect, (index) => selectCell(index, value)) : [])
        ]
        return actions
      })
    ),

  (action$, state$) =>
    action$.pipe(
      ofType(UPDATE_VALUES),
      map(({ value }) => ({
        mode: getPencilMode(state$.value),
        value
      })),
      filter(({ mode }) => mode !== 'show' && mode !== 'find'),
      map(({ mode, value }) => ({
        selected: getSelected(state$.value),
        mode,
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
          default:
            return
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
      ? _.indexOf(state[index][mode], value) === -1
        ? _.chain([...state[index][mode], value])
            .first(8)
            .sort()
            .value()
        : _.without(state[index][mode], value)
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

// cell utilities
const boxStarts = [0, 3, 6, 27, 30, 33, 54, 57, 60]

const getColumn = (cellid) => cellid % 9
const getRow = (cellid) => Math.floor(cellid / 9)
const getBox = (cellid) => Math.floor(cellid / 27) * 3 + Math.floor(getColumn(cellid) / 3)

const getColumnIndexes = (column) => _.range(column, 81 + column, 9)
const getRowIndexes = (row) => _.range(row * 9, row * 9 + 9)
const getBoxIndexes = (boxid) =>
  _.chain(_.range(boxStarts[boxid], boxStarts[boxid] + 3))
    .map((i) => [i, i + 9, i + 18])
    .flatten()
    .value()

const getPossibleCells = (state, box, value) => {
  const boxIndexes = getBoxIndexes(box)
  if (_.filter(boxIndexes, (id) => getCellValue(state, id) === value).length === 0) {
    return _.chain(boxIndexes)
      .filter((id) => {
        const value = getCellValue(state, id)
        return value === 0 || value === undefined
      })
      .filter((id) => {
        const values = _.chain(_.union(getRowIndexes(getRow(id)), getColumnIndexes(getColumn(id))))
          .tap((v) => id === 17 && console.log(' *** values:', id, v))
          .map((id) => getCellValue(state, id) === value)
          .value()

        id === 17 && console.log(' *** values:', id, getColumnIndexes(getColumn(id)))
        return !_.contains(values, true)
      })
      .value()
  }
  return []
}

export default reducer
