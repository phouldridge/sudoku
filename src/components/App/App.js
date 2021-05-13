import { useDispatch, useSelector } from 'react-redux'
import SudokuGrid from 'components/SudokuGrid'
import { updateValues, setValues, setCorners, setCenters, setColors } from 'store/sudoku'
import './App.css'
import NumberBar from 'components/NumberBar'
import ButtonBar from 'components/ButtonBar'
import { getPencilMode } from 'store/ui'

const App = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => getPencilMode(state))
  const handleKeyDown = (e) => {
    if (e.key >= 0 && e.key <= 9) {
      dispatch(updateValues(+e.key))
      // switch (mode) {
      //   case 'normal':
      //     return dispatch(setValues(+e.key))
      //   case 'corner':
      //     return dispatch(setCorners(+e.key))
      //   case 'center':
      //     return dispatch(setCenters(+e.key))
      //   case 'color':
      //     return dispatch(setColors(+e.key))
      //   default:
      //     return
      // }
    }
  }
  const handleKeyUp = (e) => {}

  return (
    <div className="App" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
      <header className="App-header">
        <NumberBar />
        <SudokuGrid />
        <ButtonBar />
      </header>
    </div>
  )
}

export default App
