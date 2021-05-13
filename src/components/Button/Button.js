import classnames from 'classnames'

import './Button.css'

export const Button = ({ className = '', style = {}, lable, onClick, value, toggle = false }) => {
  const buttonClassNames = toggle
    ? classnames(`button ${className}`, { 'button-on': value })
    : `button ${className}`
  return (
    <button
      key={`${lable}-button`}
      className={buttonClassNames}
      style={style}
      type="button"
      onClick={(event) => onClick(event)}
    >
      {lable}
    </button>
  )
}
export default Button
