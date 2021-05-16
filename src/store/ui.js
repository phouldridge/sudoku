import { combineEpics } from 'redux-observable'
import tinycolor from 'tinycolor2'
import _ from 'underscore'

// constants
const SET_SELECTION_MODE = 'ui/SET_SELECTION_MODE'
const SELECT_CELL = 'ui/SELECT_CELL'
const CLEAR_SELECTED = 'ui/CLEAR_SELECTED'
const SET_PENCIL_MODE = 'ui/SET_PENCIL_MODE'

// actions
export const setSelectionMode = (value) => ({ type: SET_SELECTION_MODE, value })
export const selectCell = (index) => ({ type: SELECT_CELL, index })
export const clearSelected = () => ({ type: CLEAR_SELECTED })
export const setPencilMode = (mode) => ({ type: SET_PENCIL_MODE, mode })

// selector
export const isSelecting = (state, index) => state.ui.selecting
export const isCellSelected = (state, index) => state.ui.selected[index]
export const getSelected = (state) => state.ui.selected
export const getPencilModes = (state) => state.ui.pencilMode
export const getPencilMode = (state) => {
  const mode = _.reduce(
    Object.keys(state.ui.pencilMode),
    (mode, index) => (state.ui.pencilMode[index] ? index : mode),
    undefined
  )
  return mode || 'normal'
}

export const fromColors = (added, base) => {
  var mix = [0, 0, 0, 0]
  mix[3] = 1 - (1 - added[3]) * (1 - base[3]) // alpha
  mix[0] = Math.round(
    (added[0] * added[3]) / mix[3] + (base[0] * base[3] * (1 - added[3])) / mix[3]
  ) // red
  mix[1] = Math.round(
    (added[1] * added[3]) / mix[3] + (base[1] * base[3] * (1 - added[3])) / mix[3]
  ) // green
  mix[2] = Math.round(
    (added[2] * added[3]) / mix[3] + (base[2] * base[3] * (1 - added[3])) / mix[3]
  ) // blue
}
export const getCellColor = (colorMark, selected) => {
  return colorMark && selected
    ? tinycolor.mix(colors[colorMark - 1], '#ffffa0')
    : colorMark
    ? colors[colorMark - 1]
    : selected
    ? '#ffffa0'
    : 'snow'
}
export const colors = [
  '#0074D9AA', //blue
  '#7FDBFFAA', //aqua
  '#39CCCCAA', //teal
  '#3D9970AA', //olive
  '#FFDC0088', //yellow
  '#FF851BAA', //orange
  '#85144B44', //maroon
  '#B10DC9FF', //purple
  '#DDDDDDFF' //silver
]

// epics
export const epics = combineEpics()

// reducer
const initialState = {
  selecting: false,
  selected: [],
  pencilMode: { normal: true, corner: false, center: false, color: false, show: false }
}
export const reducer = (state = initialState, { type, value, index, mode }) => {
  switch (type) {
    case SET_SELECTION_MODE:
      return { ...state, selecting: value }
    case CLEAR_SELECTED:
      return { ...state, selected: [] }
    case SELECT_CELL:
      return { ...state, selected: { ...state.selected, [index]: true } }
    case SET_PENCIL_MODE:
      return { ...state, pencilMode: mode }
    default:
      return state
  }
}

export default reducer
