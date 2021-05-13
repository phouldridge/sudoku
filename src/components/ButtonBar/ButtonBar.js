import { useSelector, useDispatch } from 'react-redux'
import { VerticalDivider } from './VerticalDivider'
import Button from 'components/Button'
import ButtonGroup from 'components/ButtonGroup'
import { getPencilModes, setPencilMode } from 'store/ui'
import { updateValues } from 'store/sudoku'
import './ButtonBar.css'

const ButtonBar = () => {
  const dispatch = useDispatch()
  const modes = useSelector((state) => getPencilModes(state))

  const groupHandler = (newState) => {
    dispatch(setPencilMode(newState))
  }

  return (
    <div className="button-bar">
      <ButtonGroup buttonState={modes} onClick={groupHandler} />
      <VerticalDivider />
      <Button lable="clear" onClick={() => dispatch(updateValues(undefined))} />
      {/* <Button lable="check" onClick={() => {}} /> */}
      {/* <Button lable="undo" onClick={() => {}} /> */}
      {/* <Button lable="redo" onClick={() => {}} /> */}
    </div>
  )
}
export default ButtonBar
