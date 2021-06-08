import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap, filter } from 'rxjs/operators'
import _ from 'underscore'
import { getSelected, getPencilMode, selectCell, clearSelected } from 'store/ui'

// constants
export const LOAD_SUDOKU = 'sudoku/LOAD_SUDOKU'
export const CHECK_VALUES = 'sudoku/CHECK_VALUES'
export const UPDATE_VALUES = 'sudoku/UPDATE_VALUES'
export const SET_VALUE = 'sudoku/SET_VALUE'
export const SET_CORNER = 'sudoku/SET_CORNER'
export const SET_CENTER = 'sudoku/SET_CENTER'
export const SET_COLOR = 'sudoku/SET_COLOR'
export const SET_PAIRS = 'sudoku/SET_PAIRS'
export const SET_PENCIL_MARK = 'sudoku/SET_PENCIL_MARK'

// actions
export const loadSudoku = (values) => ({ type: LOAD_SUDOKU, values })
export const checkValues = () => ({ type: CHECK_VALUES })
export const updateValues = (value) => ({ type: UPDATE_VALUES, value })
export const setPairs = (value) => ({ type: SET_PAIRS, value })
export const setValue = (index, value) => ({ type: SET_VALUE, index, value })
const setCorner = (index, value) => ({ type: SET_CORNER, index, value })
export const setCenter = (index, value, action) => ({ type: SET_CENTER, index, value, action })
const setColor = (index, value) => ({ type: SET_COLOR, index, value })

// selectors
export const getCellValue = (state, index) =>
  state.sudoku[index] ? state.sudoku[index].given || state.sudoku[index].value : 0
export const getCellData = (state, index) => (state.sudoku[index] ? state.sudoku[index] : 0)
export const getCellsForValues = (state, value) =>
  _.chain(state.sudoku)
    .filter((cell) => cell.given === value || cell.value === value)
    .map((cell) => cell.index)
    .value()
export const getUnresolvedCells = (state) =>
  _.chain(state.sudoku)
    .filter((cell) => !cell.given && !cell.value)
    .map((cell) => cell.index)
    .compact()
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
        const toSelect = getAllCells(state$.value, value)
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
      filter(({ mode }) => mode === 'pairs'),
      mergeMap(({ value }) => {
        const toSelect = _.without(
          getAllCells(state$.value, value, 2),
          ...getMarkedCells(state$.value, 'corner', value)
        )
        const actions = [
          clearSelected(),
          ...(value !== undefined ? _.map(toSelect, (index) => setCorner(index, value)) : [])
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
      filter(({ mode }) => mode !== 'show' && mode !== 'find' && mode !== 'pairs'),
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
const setPencilMarks = (state, mode, index, value, action) => {
  const set =
    action === 'set'
      ? true
      : action === 'clear'
      ? false
      : _.indexOf(state[index][mode], value) === -1
  return {
    ...state,
    [index]: {
      ...state[index],
      [mode]: state[index][mode]
        ? set
          ? _.chain([...state[index][mode], value])
              .first(8)
              .sort()
              .value()
          : _.without(state[index][mode], value)
        : [value]
    }
  }
}

const initialState = {}
export const reducer = (state = initialState, { type, index, value, values, action }) => {
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
        ? setPencilMarks(state, 'center', index, value, action)
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

const isColumn = (pair) => getColumn(pair[0]) === getColumn(pair[1])
const isRow = (pair) => getRow(pair[0]) === getRow(pair[1])
const isBox = (pair) => getBox(pair[0]) === getBox(pair[1])

export const getColumn = (cellid) => cellid % 9
export const getRow = (cellid) => Math.floor(cellid / 9)
export const getBox = (cellid) => Math.floor(cellid / 27) * 3 + Math.floor(getColumn(cellid) / 3)

const getColumnIndexes = (column) => _.range(column, 81 + column, 9)
const getRowIndexes = (row) => _.range(row * 9, row * 9 + 9)
const getBoxIndexes = (boxid) =>
  _.chain(_.range(boxStarts[boxid], boxStarts[boxid] + 3))
    .map((i) => [i, i + 9, i + 18])
    .flatten()
    .value()

const getMarkedCells = (state, mode, value) =>
  _.chain(_.range(0, 81))
    .map((id) => getCellData(state, id))
    .filter((data) => _.contains(data[mode], value))
    .map((data) => data.index)
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
          .map((id) => getCellValue(state, id) === value)
          .value()
        return !_.contains(values, true)
      })
      .value()
  }
  return []
}
export const getAffectedCells = (state, index, value) => {
  return _.chain([
    ...getColumnIndexes(getColumn(index)),
    ...getRowIndexes(getRow(index)),
    ...getBoxIndexes(getBox(index))
  ])
    .unique()
    .without(index)
    .filter((index) => {
      const data = getCellData(state, index)
      return data.center && _.contains(data.center, value)
    })
    .value()
}
export const getAffectedPairCells = (state, pair, value) => {
  return _.chain([
    ...(isColumn(pair) ? getColumnIndexes(getColumn(pair[0])) : []),
    ...(isRow(pair) ? getRowIndexes(getRow(pair[0])) : []),
    ...(isBox(pair) ? getBoxIndexes(getBox(pair[0])) : [])
  ])
    .unique()
    .without(pair[0], pair[1])
    .tap((result) =>
      pair[0] === 7 && pair[1] === 8
        ? console.log(' *** result1:', pair, value, result, getCellData(state, 0))
        : ''
    )
    .filter((index) => {
      const data = getCellData(state, index)
      return data.given || data.value ? false : data.center && _.contains(data.center, value)
    })
    .tap((result) =>
      pair[0] === 7 && pair[1] === 8 ? console.log(' *** result2:', pair, value, result) : ''
    )
    .value()
}
export const getAllCells = (state, value, limit) =>
  _.chain(_.range(0, 9))
    .map((box) => getPossibleCells(state, box, value))
    .filter((ids) => (limit ? ids.length <= limit : true))
    .flatten()
    .unique()
    .value()

const getCenters = (state, index) => {
  return !state.sudoku[index].given && !state.sudoku[index].value
    ? state.sudoku[index].center
      ? state.sudoku[index].center
      : []
    : []
}

export const findNakedSingles = (state) =>
  _.chain(_.range(81))
    .filter((index) => getCenters(state, index).length === 1)
    .map((index) => ({ index, value: getCenters(state, index)[0] }))
    .value()

export const checkMethods = { box: getBoxIndexes, row: getRowIndexes, column: getColumnIndexes }
export const indexMethods = { box: getBox, row: getRow, column: getColumn }
export const findHiddenSingles = (state, check) =>
  _.chain(_.range(0, 9))
    .map((id) => {
      const indexes = checkMethods[check](id)
      const results = _.chain(_.range(1, 10))
        .map((value) => ({
          value,
          indexes: _.filter(indexes, (index) => _.contains(getCenters(state, index), value))
        }))
        .filter((list) => {
          return list.indexes.length === 1
        })
        .value()
      return _.map(results, (result) => ({
        type: check,
        id,
        value: result.value,
        index: result.indexes[0]
      }))
    })
    .filter((list) => list.length > 0)
    .flatten()
    .value()

export const findNakedPairs = (state, check) =>
  _.chain(_.range(0, 9))
    .map((id) => {
      const indexes = checkMethods[check](id)
      return _.chain(indexes)
        .map((index) => ({
          index,
          values: getCenters(state, index)
        }))
        .filter((list) => list.values.length === 2)
        .groupBy((list) => list.values)
        .map((group) => ({
          type: check,
          id,
          values: group[0].values,
          indexes: _.map(group, (p) => p.index)
        }))
        .filter((pair) => pair.values.length === 2 && pair.indexes.length === 2)
        .value()
    })
    .filter((list) => list.length > 0)
    .flatten()
    .value()

export const findPointingPairs = (state, check) =>
  _.chain(_.range(0, 9))
    .map((id) => {
      const indexes = checkMethods[check](id)
      const result = _.chain(_.range(1, 10))
        .reduce((acc, value) => {
          const byValue = _.filter(indexes, (index) => _.contains(getCenters(state, index), value))
          return byValue.length === 2 ? [...acc, { value, indexes: byValue }] : acc
        }, [])
        .value()
      return result
    })
    .flatten()
    .filter((pair) => {
      return isColumn(pair.indexes) || isRow(pair.indexes)
    })
    .value()

export const findInvalidValues = (state) => {
  const missing = _.filter(_.range(0, 81), (index) => {
    const data = getCellData(state, index)
    return !data.given && !data.value
  })
  const invalid = _.chain(['box', 'column', 'row'])
    .map((check) =>
      _.map(_.range(0, 9), (id) =>
        _.chain(checkMethods[check](id))
          .map((index) => {
            const data = getCellData(state, index)
            return { index, value: data.given || data.value }
          })
          .filter((value) => value.value)
          .groupBy((value) => value.value)
          .filter((value) => value.length > 1)
          .map((values) => _.map(values, (value) => value.index))
          .value()
      )
    )
    .flatten()
    .unique()
    .value()
  return { missing, invalid }
}

// .map((type) =>
//   _.chain(_.range(0, 9))
//     .map((id) => checkMethods[type](id))
//     .map((indexes) => {
//       const data = getCellData(state, indexes[0])
//       return { missing: _.filter(indexes, (cell) => !cell.given && !cell.value), invalid: {} }
//     })
//     .value()
// )
// .value()

export default reducer
