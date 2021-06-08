import { useSelector, useDispatch } from 'react-redux'
import ButtonGroup from 'components/ButtonGroup'
import { getPencilModes, setPencilMode } from 'store/ui'
import './ButtonBar.css'

const ButtonBar = () => {
  const dispatch = useDispatch()
  const modes = useSelector((state) => getPencilModes(state))

  const groupHandler = (newState) => dispatch(setPencilMode(newState))

  return (
    <>
      <div className="button-bar">
        <ButtonGroup buttonState={modes} onClick={groupHandler} />
        {/* <VerticalDivider /> */}
        {/* <Button label="clear" onClick={() => dispatch(updateValues(undefined))} /> */}
        {/* <Button label="redo" onClick={() => {}} /> */}
      </div>
    </>
  )
}
export default ButtonBar
