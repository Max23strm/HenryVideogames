import {useState} from 'react'
import{ Link }from 'react-router-dom'
import '../Landing/Landing.css'
import imagen from '../../images/Group1.png'



function Landing() {
  const [mostrar, setMostrar]=useState(false)

  const handleLoad=()=>{
    setMostrar(!mostrar)
  }
  return (
    <div className='landingBack'  >
            <img onLoad={handleLoad} src={imagen} className={`${mostrar?"showLanding":"hideLanding"} slide-fwd-center`} alt="" />
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