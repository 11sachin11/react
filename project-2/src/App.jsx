import React from 'react'
import Card from './components/Card'

const App = () => {
  return (
    <div className='parent'>
      <Card user='Saurabh Thakulla' age={18} img='https://www.aurax.fit/assets/Saurabh_Thakull.jpeg' profile='Hello guys this is my profile' />
      <Card user='RajSangeeta' age={18} img='https://media.istockphoto.com/id/1667682801/photo/happy-cute-little-indian-girl-child-standing-having-fun-at-summer-park-or-garden.jpg?s=2048x2048&w=is&k=20&c=7TdrHI21SuVYh5ZEYqOfhO8326uUUbdNginlge9ua6w=' profile='Hello guys this is my profile' />
      <Card user='Krisjo' age={18} img='https://media.istockphoto.com/id/1047528802/photo/portrait-of-smiling-male-high-school-student-outside-college-building-with-other-teenage.jpg?s=612x612&w=0&k=20&c=xiFmbda0_9GK7FRwvXbUSEWun88J8EHlRYTt0G44suY=' profile='Hello guys this is my profile' />
    </div>
  )
}

export default App