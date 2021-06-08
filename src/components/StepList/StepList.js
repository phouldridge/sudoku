import React from 'react'
import { useSelector } from 'react-redux'
import { getSteps } from 'store/solve'

import './StepList.css'
const getPairAffected = (step) =>
  step.values[1] ? `(${step.values[0]},${step.values[1]})` : `(${step.values[0]})`
const getStepName = (step) => {
  return step.type === 'solved'
    ? step.cellName
    : step.type === 'single'
    ? `${step.method}: ${step.cellName} → ${step.value}`
    : `${step.method}: ${step.cellName} ${getPairAffected(step)}`
}

const StepList = () => {
  const steps = useSelector((state) => getSteps(state))
  return (
    <div className="step-list">
      {steps.map((step, key) => {
        return <div key={key}>{`${key}: ${getStepName(step)}`}</div>
      })}
    </div>
  )
}

export default StepList
