import React from 'react'
import reactDom from 'react-dom'
import ADD from './hello.ts'

const App = () => {
  const sum = ADD(1, 2)
  return <div>test page: {sum}</div>
}
reactDom.render(<App />, document.getElementById('root'))
