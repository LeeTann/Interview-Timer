import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [timerDays, setTimerDays] = useState(0)
  const [timerHours, setTimerHours] = useState(0)
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)

  const [date, setDate] = useState(0)
  let [userInput, setuserInput] = useState('')

  let countdownDate = new Date(`${date}`)
  const now = new Date().getTime()
  let difference = countdownDate - now

  let second = 1000
  let minute = second * 60
  let hour = minute * 60
  let day = hour * 24

  let interval = useRef()

  const startTimer = () => {
    interval = setInterval(() => {
      const days = Math.floor(difference / day)
      const hours = Math.floor((difference % day) / hour)
      const minutes = Math.floor((difference % hour) / minute)
      const seconds = Math.floor((difference % minute) / second)

      if (difference <= 0) {
        // stop timer
        clearInterval(interval.current)
      } else {
        // update timer
        setTimerDays(days)
        setTimerHours(hours)
        setTimerMinutes(minutes)
        setTimerSeconds(seconds)
      }
    }, 1000)
  }

  useEffect(() => {
    const data = localStorage.getItem('userDate')
    if (data) {
      setDate(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(interval)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.length === 0) {
      alert('Please select date and time to start timer')
    } else {
      setDate(userInput)
      localStorage.setItem('userDate', JSON.stringify(userInput))
    }
  }

  return (
    <section className='container'>
      <section className='timer'>
        <h2>Interview Timer</h2>
        <form>
          <input
            type='datetime-local'
            value={userInput}
            onChange={(e) => setuserInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Enter Date</button>
        </form>
        {!date || difference >= 0 ? (
          <div className='countdown'>
            <div id='day'>{timerDays}</div>
            <div id='hour'>{timerHours}</div>
            <div id='minute'>{timerMinutes}</div>
            <div id='second'>{timerSeconds}</div>
          </div>
        ) : (
          <div className='interview-time'>Interview Time !!!</div>
        )}
      </section>
    </section>
  )
}

export default App
