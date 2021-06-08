import { useSelector, useDispatch } from 'react-redux'
import Button from 'components/Button'
import { getSolveActions } from 'store/solve'

import './ActionBar.css'

const ActionBar = () => {
  const dispatch = useDispatch()
  const actions = useSelector((state) => getSolveActions(state))

  return (
    <div className="action-bar">
      {actions.map(({ name, action }) => (
        <Button
          key={name}
          label={name}
          onClick={() => {
            dispatch(action)
          }}
        />
      ))}
    </div>
  )
}
export default ActionBar
