import { combineEpics, ofType } from 'redux-observable'
import { from, timer } from 'rxjs'
import { map, tap, filter, mergeMap, concatMap, startWith, ignoreElements } from 'rxjs/operators'
import _ from 'underscore'
import {
  getAllCells,
  setValue,
  setCenter,
  getRow,
  getColumn,
  getAffectedCells,
  getAffectedPairCells,
  findNakedSingles,
  findHiddenSingles,
  findNakedPairs,
  findPointingPairs,
  indexMethods,
  getUnresolvedCells,
  findInvalidValues
} from './sudoku'
import { clearSelected } from 'store/ui'

// constants
const START = 'solve/START'
// const SINGLES = 'solve/SINGLES'
const NAKED_SINGLES = 'solve/NAKED_SINGLES'
const HIDDEN_SINGLES = 'solve/HIDDEN_SINGLES'
// const PAIRS = 'solve/PAIRS'
const NAKED_PAIRS = 'solve/NAKED_PAIRS'
const POINTING_PAIRS = 'solve/POINTING_PAIRS'
const ADD_STEPS = 'solve/ADD_STEPS'
const APPLY_STEPS = 'solve/APPLY_STEPS'
const REVERSE_STEP = 'solve/REVERSE_STEP'
const CHECK_VALUES = 'solve/CHECK_VALUES'
const ADD_ACTIONS = 'solve/ADD_ACTION'
const NEXT_ACTION = 'solve/NEXT_ACTION'
const REMOVE_ACTION = 'solve/REMOVE_ACTION'
const CLEAR_ACTIONS = 'solve/CLEAR_ACTIONS'
const MORE_ACTIONS = 'solve/MORE_ACTIONS'
const LAST_ACTION = 'solve/LAST_ACTION'
const UNABLE_TO_SOLVE = 'solve/UNABLE_TO_SOLVE'

// actions
const addSteps = (steps) => ({ type: ADD_STEPS, steps })
const applySteps = (steps) => ({ type: APPLY_STEPS, steps })
const removeAction = () => ({ type: REMOVE_ACTION })
const nextAction = () => ({ type: NEXT_ACTION })
const addActions = (actions) => ({ type: ADD_ACTIONS, actions })
const setLastAction = (action) => ({ type: LAST_ACTION, action })

// selectors
export const getSolveActions = (state) => state.solve.buttons
export const getSteps = (state) => state.solve.steps
export const getNextAction = (state) => _.first(state.solve.actions)

const getCellName = (index) => `R${getRow(index) + 1}C${getColumn(index) + 1}`
const getPairCellName = (indexes) => `${getCellName(indexes[0])} & ${getCellName(indexes[1])}`
const getStep = (state$, method, index, value) => ({
  type: 'single',
  method,
  index,
  value,
  cellName: getCellName(index)
})

const getPairStep = (state$, method, indexes, values) => ({
  type: 'pair',
  method,
  indexes,
  values,
  cellName: getPairCellName(indexes)
})

const alreadyFound = (state, cellName) => {
  const index = _.findIndex(state.solve.steps, (step) => step.cellName === cellName)
  return index !== -1
}

// epics
const actions = [
  { type: NAKED_SINGLES },
  { type: HIDDEN_SINGLES, check: 'box' },
  { type: HIDDEN_SINGLES, check: 'row' },
  { type: HIDDEN_SINGLES, check: 'column' },
  { type: NAKED_PAIRS, check: 'box' },
  { type: NAKED_PAIRS, check: 'row' },
  { type: NAKED_PAIRS, check: 'column' },
  { type: POINTING_PAIRS, check: 'box' },
  { type: POINTING_PAIRS, check: 'row' },
  { type: POINTING_PAIRS, check: 'column' },
  { type: UNABLE_TO_SOLVE }
]
export const epics = combineEpics(
  (action$, state$) =>
    action$.pipe(
      ofType(START),
      map(() => clearSelected())
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(START),
      map(() =>
        _.range(1, 10).map((value) => ({ value, cells: getAllCells(state$.value, value) }))
      ),
      mergeMap((allCells) =>
        from([
          ..._.flatten(
            allCells.map(({ value, cells }) => cells.map((cell) => setCenter(cell, value)))
          ),
          { type: MORE_ACTIONS }
        ])
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(CHECK_VALUES),
      map(() => findInvalidValues(state$.value)),
      map((results) => {
        return results.missing.length === 0 && results.invalid.length === 0
          ? 'Looks good to me!'
          : `Unresolved cells: ${results.missing.length}\nBroken cells: ${_.map(
              results.invalid,
              (cell) => getCellName(cell)
            )}`
      }),
      tap((message) => alert(message)),
      ignoreElements()
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(NAKED_SINGLES),
      map(() =>
        _.map(findNakedSingles(state$.value), (single) =>
          getStep(state$, 'Naked single', single.index, single.value)
        )
      ),
      filter((steps) => steps.length > 0),
      map((steps) =>
        _.map(steps, (step) => ({
          ...step,
          affected: { [step.value]: getAffectedCells(state$.value, step.index, step.value) }
        }))
      ),
      mergeMap((steps) => from([addSteps(steps), applySteps(steps)]))
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(HIDDEN_SINGLES),
      map(({ check }) => {
        const raw = findHiddenSingles(state$.value, check)
        const singles = _.filter(
          raw,
          ({ index }) => !alreadyFound(state$.value, getCellName(index))
        )
        const steps = _.map(singles, ({ type, id, index, value }) =>
          getStep(state$, `Hidden single in ${type} ${id + 1}`, index, value)
        )
        return steps
      }),
      map((steps) =>
        _.map(steps, (step) => ({
          ...step,
          affected: { [step.value]: getAffectedCells(state$.value, step.index, step.value) }
        }))
      ),
      mergeMap((steps) => from([addSteps(steps), applySteps(steps)]))
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(NAKED_PAIRS),
      map(({ check }) => {
        const raw = findNakedPairs(state$.value, check)
        const pairs = _.filter(
          raw,
          ({ indexes }) => !alreadyFound(state$.value, getPairCellName(indexes))
        )
        const steps = _.map(pairs, ({ type, id, indexes, values }) =>
          getPairStep(state$, `Naked pair in ${type} ${id + 1}`, indexes, values)
        )
        return steps
      }),
      map((steps) =>
        _.map(steps, (step) => ({
          ...step,
          affected: {
            [step.values[0]]: getAffectedPairCells(state$.value, step.indexes, step.values[0]),
            [step.values[1]]: getAffectedPairCells(state$.value, step.indexes, step.values[1])
          }
        }))
      ),
      mergeMap((steps) => from([addSteps(steps), applySteps(steps)]))
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(POINTING_PAIRS),
      map(({ check }) => {
        const raw = findPointingPairs(state$.value, 'box')
        const pairs = _.filter(
          raw,
          ({ indexes }) => !alreadyFound(state$.value, getPairCellName(indexes))
        )
        const steps = _.map(pairs, ({ indexes, value }) =>
          getPairStep(
            state$,
            `Pointing pair in ${check} ${indexMethods[check](indexes[0]) + 1}`,
            indexes,
            [value]
          )
        )
        return steps
      }),
      map((steps) =>
        _.chain(steps)
          .map((step) => ({
            ...step,
            affected: {
              [step.values[0]]: getAffectedPairCells(state$.value, step.indexes, step.values[0])
            }
          }))
          .filter((step) =>
            _.every(_.map(step.values, (value) => step.affected[value].length !== 0))
          )
          .value()
      ),
      mergeMap((steps) => from([addSteps(steps), applySteps(steps)]))
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(APPLY_STEPS),
      mergeMap(({ steps }) =>
        _.chain(steps)
          .map((step) => [
            setValue(step.index, step.value),
            ..._.map(step.affected, (affected, value) =>
              _.map(affected, (index) => setCenter(index, +value, 'clear'))
            )
          ])
          .flatten()
          .value()
      )
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(REVERSE_STEP),
      mergeMap(() => {
        const step = _.last(state$.value.solve.steps)
        const actions = [
          setValue(step.index, undefined),
          ..._.map(step.data, (value) => setCenter(step.index, value)),
          ..._.map(step.affected, (index) => setCenter(index, step.value, 'set'))
        ]
        return from(actions)
      })
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(NEXT_ACTION),
      map(() => getNextAction(state$.value)),
      filter((action) => !!action),
      concatMap((value) => timer(5).pipe(ignoreElements(), startWith(value))),
      mergeMap((action) => from([removeAction(), action, nextAction()]))
    ),
  (action$, state$) =>
    action$.pipe(
      ofType(MORE_ACTIONS),
      map(() => {
        const unresolved = getUnresolvedCells(state$.value).length
        const nextAction =
          state$.value.solve.lastAction.unresolved !== unresolved ||
          state$.value.solve.lastAction.id === actions.length - 1
            ? 0
            : ++state$.value.solve.lastAction.id
        return { unresolved, nextAction }
      }),
      mergeMap(({ unresolved, nextAction }) =>
        unresolved === 0 || nextAction.id === 8
          ? from([
              { type: CLEAR_ACTIONS },
              { type: ADD_STEPS, steps: [{ type: 'solved', cellName: 'Solved' }] }
            ])
          : from([
              setLastAction({ ...actions[nextAction], unresolved, id: nextAction }),
              addActions([actions[nextAction], { type: MORE_ACTIONS }]),
              { type: NEXT_ACTION }
            ])
      )
    )
)

// reducer
const initialState = {
  buttons: [
    { name: 'Solve', action: { type: START } },
    { name: 'Check', action: { type: CHECK_VALUES } }
  ],
  actions: [],
  steps: [],
  lastAction: { type: 'start', unresolved: 81, id: -1 }
}

export const reducer = (state = initialState, { type, steps, actions, action }) => {
  switch (type) {
    case ADD_ACTIONS: {
      return {
        ...state,
        actions: _.unique([...state.actions, ...actions], false, (a) => a.type + a.check)
      }
    }
    case REMOVE_ACTION: {
      return { ...state, actions: _.rest(state.actions, 1) }
    }
    case CLEAR_ACTIONS: {
      return { ...state, actions: [] }
    }
    case ADD_STEPS: {
      return { ...state, steps: [...state.steps, ...steps] }
    }
    case LAST_ACTION: {
      return { ...state, lastAction: action }
    }
    default:
      return state
  }
}

export default reducer
