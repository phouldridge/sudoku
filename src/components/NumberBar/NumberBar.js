import { useSelector, useDispatch } from 'react-redux'
import Button from 'components/Button'
import { updateValues } from 'store/sudoku'
import { getPencilMode, colors } from 'store/ui'

import './NumberBar.css'
import _ from 'underscore'
const NumberBar = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state) => getPencilMode(state))
  const handleClick = (value) => {
    dispatch(updateValues(value))
  }
  return (
    <div className="number-bar">
      {_.map(_.range(1, 10), (index) => {
        const colorStyle = { backgroundColor: colors[index - 1] }
        return (
          <Button
            key={index}
            className={'number'}
            style={mode === 'color' ? colorStyle : {}}
            lable={mode !== 'color' && <span className={`number-${mode}`}>{index}</span>}
            onClick={(event) => handleClick(index)}
          />
        )
      })}
    </div>
  )
}

export default NumberBar
