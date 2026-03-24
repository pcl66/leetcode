import { useEffect, useRef, useState } from "react"

export const useCountDown = (
  initialTime = 60,
  interval = 1000,
  onStart = () => {},
  onPause = () => {},
  onReset = () => {},
) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const timeId = useRef(0)
  const start = () => {
    if(isRunning) return
    onStart()
    startCount()
  }
  function startCount() {
    setIsRunning(true)
    timeId.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timeId.current)
          setIsRunning(false)
        }
        return prev - 1
      })
    }, interval)
  }
  const resetAndStart = () => {
    clearInterval(timeId.current)
    setTimeLeft(initialTime)
    setIsRunning(false)
    startCount()
    onReset()
  }
  useEffect(() => {
    return () => {
      clearInterval(timeId.current)
    }
  }, [])
  return {
    timeLeft,
    isRunning,
    resetAndStart,
    start
  }
}