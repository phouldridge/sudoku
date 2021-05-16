import { useDispatch } from 'react-redux'
import SudokuGrid from 'components/SudokuGrid'
import { updateValues } from 'store/sudoku'
import './App.css'
import NumberBar from 'components/NumberBar'
import ButtonBar from 'components/ButtonBar'

const App = () => {
  const dispatch = useDispatch()
  const handleKeyDown = (e) => {
    if (e.key >= 0 && e.key <= 9) {
      dispatch(updateValues(+e.key))
    }
  }

  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="App-header">
        <div className="App-container">
          <NumberBar />
          <SudokuGrid />
          <ButtonBar />
        </div>
      </header>
    </div>
  )
}

export default App
