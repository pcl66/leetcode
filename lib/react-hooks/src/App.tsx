import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCountDown } from './hooks/use-count-down.ts'

function App() {
  const [count, setCount] = useState(0)
  const { start, isRunning, timeLeft, resetAndStart:reset } = useCountDown(15, 1000)
  const expensiveOperation = () => {
    for(let i = 0; i < 300000; i++) { 
      console.log(i)
    }
  }

  useEffect(() => {
    start()
    console.log('run')
  }, [])

  return (
    <>
    <button onClick={reset}>button</button>
    <button onClick={expensiveOperation}>expensive</button>
    {isRunning && <div>running</div>}
      <div></div>
      <div>{timeLeft}</div>
    </>
  )
}

export default App
