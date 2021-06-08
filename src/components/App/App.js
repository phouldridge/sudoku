import { useDispatch } from 'react-redux'
import SudokuGrid from 'components/SudokuGrid'
import { updateValues } from 'store/sudoku'
import './App.css'
import ActionBar from 'components/ActionBar'
import NumberBar from 'components/NumberBar'
import ButtonBar from 'components/ButtonBar'
import StepList from 'components/StepList'

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
          <div className="display-container">
            <NumberBar />
            <SudokuGrid />
            <ButtonBar />
          </div>
          <ActionBar />
          <StepList />
        </div>
      </header>
    </div>
  )
}

export default App
