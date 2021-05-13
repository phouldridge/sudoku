import { combineEpics } from 'redux-observable'

// constants
const TOGGLE_ON = 'toggle/TOGGLE_ON'

// actions
export const toggleOn = (name) => ({ type: TOGGLE_ON, name })

// selectors
export const getToggleNames = (state) => Object.keys(state.toggle)
export const getSettings = (state, name) => state.toggle[name]

// epics
export const epics = combineEpics()

// reducer
const initialState = {
  corner: { title: 'Corners', on: false },
  center: { title: 'Center', on: false }
}
export const reducer = (state = initialState, { type, name }) => {
  switch (type) {
    case TOGGLE_ON:
      return { ...state, [name]: { ...state[name], on: !state[name].on } }
    default:
      return state
  }
}

export default reducer
