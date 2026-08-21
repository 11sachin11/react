import React from 'react'
import practice from './components/practice'
import Navbar from './components/navbar'
const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container"> 
        <h1>my name is sachin shahi</h1>
        <p>This is a paragraph.</p>
      </div>
       <div className="container"> 
        <h1>my name is sachin shahi</h1>
        <p>This is a paragraph.</p>
      </div>
       <div className="container"> 
        <h1>my name is sachin shahi</h1>
        <p>This is a paragraph.</p>
      </div>
      {practice()}
    </div>
  )
}

export default App