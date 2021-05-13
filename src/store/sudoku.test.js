import _ from 'underscore'

describe('test', () => {
  it('array', () => {
    const start = _.range(1, 82)
    const getRow = (i) => {
      const first = i * 9
      return start.slice(first, first + 9)
    }
    console.log(getRow(0))
    console.log(getRow(1))
    console.log(getRow(2))
    console.log(getRow(3))
    console.log(getRow(4))
    console.log(getRow(5))
    console.log(getRow(6))
    console.log(getRow(7))
  })
})
