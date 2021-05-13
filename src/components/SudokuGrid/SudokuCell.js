import { useSelector } from 'react-redux'
import { getCellData } from 'store/sudoku'
import { isCellSelected, getCellColor } from 'store/ui'
import _ from 'underscore'

const SudokuCell = ({ id }) => {
  const data = useSelector((state) => getCellData(state, id))
  const selected = useSelector((state) => isCellSelected(state, id))
  const classNames = `sudoku-cell ${boxPosition[id]}`
  const value = data.given || data.value
  const cornerSpans = _.map(data.corner, (value, i) => (
    <span key={`${id}-${i}`} className={`sudoku-corner ${cornerClass[i]}`}>
      {value}
    </span>
  ))
  const centerSpan = data.center && (
    <span key={`${id}-center`} className="sudoku-center">
      {_.reduce(data.center, (value, id) => `${value}${id}`, '')}
    </span>
  )

  const pencilMarks = [...cornerSpans, centerSpan]
  const backgroundColor = getCellColor(data.color, selected)
  return (
    <div className={classNames} id={id} style={{ backgroundColor }}>
      {value !== 0 && (
        <div className="sudoku-value" style={data.given ? { color: '#040404' } : {}}>
          {value ? value : pencilMarks && pencilMarks.length > 0 ? pencilMarks : ''}
        </div>
      )}
    </div>
  )
}
const cornerClass = [
  'corner-ul',
  'corner-ur',
  'corner-lr',
  'corner-ll',
  'corner-top',
  'corner-r',
  'corner-bottom',
  'corner-l'
]
const boxPosition = [
  ...['tl', 'tc', 'tr', 'tl', 'tc', 'tr', 'tl', 'tc', 'tr'],
  ...['cl', 'cc', 'cr', 'cl', 'cc', 'cr', 'cl', 'cc', 'cr'],
  ...['bl', 'bc', 'br', 'bl', 'bc', 'br', 'bl', 'bc', 'br'],
  ...['tl', 'tc', 'tr', 'tl', 'tc', 'tr', 'tl', 'tc', 'tr'],
  ...['cl', 'cc', 'cr', 'cl', 'cc', 'cr', 'cl', 'cc', 'cr'],
  ...['bl', 'bc', 'br', 'bl', 'bc', 'br', 'bl', 'bc', 'br'],
  ...['tl', 'tc', 'tr', 'tl', 'tc', 'tr', 'tl', 'tc', 'tr'],
  ...['cl', 'cc', 'cr', 'cl', 'cc', 'cr', 'cl', 'cc', 'cr'],
  ...['bl', 'bc', 'br', 'bl', 'bc', 'br', 'bl', 'bc', 'br']
]

export default SudokuCell
