import Button from 'components/Button'
import _ from 'underscore'

const ButtonGroup = ({ buttonState, onClick }) => {
  const clickHandler = (label) => {
    const newState = _.reduce(
      Object.keys(buttonState),
      (state, button) => ({ ...state, [button]: button === label }),
      {}
    )
    onClick(newState)
  }
  return _.map(Object.keys(buttonState), (label) => (
    <Button
      key={`gb-${label}`}
      label={label}
      toggle={true}
      value={buttonState[label]}
      onClick={() => clickHandler(label)}
    />
  ))
}

export default ButtonGroup
