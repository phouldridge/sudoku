import classNames from 'classnames'

import './Button.css'

export const Button = ({ className = '', style = {}, label, onClick, value, toggle = false }) => {
  const buttonClassNames = toggle
    ? classNames(`button ${className}`, { 'button-on': value })
    : `button ${className}`
  return (
    <button
      key={`${label}-button`}
      className={buttonClassNames}
      style={style}
      type="button"
      onClick={(event) => onClick(event)}
    >
      {label}
    </button>
  )
}
export default Button
