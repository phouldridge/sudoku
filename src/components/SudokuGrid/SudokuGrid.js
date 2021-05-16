import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import SudokuCell from './SudokuCell'
import { setSelectionMode, getSelected, clearSelected, selectCell, isSelecting } from 'store/ui'

import './sudoku.css'

const SudokuRow = ({ row }) => {
  return (
    <div className="sudoku-row">
      {_.map(_.range(0, 9), (index) => {
        const id = row * 9 + index
        return <SudokuCell key={id} id={id} />
      })}
    </div>
  )
}

const SudokuGrid = () => {
  const dispatch = useDispatch()
  const divRef = useRef()
  const selected = useSelector((state) => getSelected(state))
  const selecting = useSelector((state) => isSelecting(state))

  const handleEvent = (event) => {
    const clientRect = divRef.current.getBoundingClientRect()
    const gridSize = clientRect.width / 9
    const cellIndex =
      Math.trunc((event.clientY - clientRect.y) / gridSize) * 9 +
      Math.trunc((event.clientX - clientRect.x) / gridSize)
    switch (event.type) {
      case 'mousedown':
        if (!event.shiftKey) {
          dispatch(clearSelected())
        }
        dispatch(setSelectionMode(true))
        dispatch(selectCell(cellIndex))
        break
      case 'mouseup':
        dispatch(setSelectionMode(false))
        break
      case 'mouseover':
        if (selecting && !selected[cellIndex]) {
          dispatch(selectCell(cellIndex))
        }
        break
      default: {
      }
    }
  }

  return (
    <div
      className="sudoku-grid"
      ref={divRef}
      onMouseDown={handleEvent}
      onMouseOver={handleEvent}
      onMouseUp={handleEvent}
    >
      {_.range(0, 9).map((row, index) => (
        <SudokuRow key={`row-${index}`} row={row} />
      ))}
    </div>
  )
}

export default SudokuGrid
