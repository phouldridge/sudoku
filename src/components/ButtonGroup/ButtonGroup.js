import Button from 'components/Button'
import _ from 'underscore'

const ButtonGroup = ({ buttonState, onClick }) => {
  const clickHandler = (lable) => {
    const newState = _.reduce(
      Object.keys(buttonState),
      (state, button) => ({ ...state, [button]: button === lable }),
      {}
    )
    onClick(newState)
  }
  return _.map(Object.keys(buttonState), (lable) => (
    <Button
      key={`gb-${lable}`}
      lable={lable}
      toggle={true}
      value={buttonState[lable]}
      onClick={() => clickHandler(lable)}
    />
  ))
}

export default ButtonGroup
