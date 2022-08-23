import React from 'react'
import{ Link }from 'react-router-dom'
import '../Landing/Landing.css'
import imagen from '../../images/Group1.png'



function Landing() {
  
  return (
    <div className='landingBack'  >
            <img src={imagen} alt="" />
            <section className='texto'>
            <h1>HENRY VIDEOGAMES</h1>
            <Link to={"/home"} className={"blink-1"}>
              <button>PRESS TO START</button>
            </Link>
            </section>
    </div>
    )
}

export default Landing