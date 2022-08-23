import { useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import SmallerSpinner from '../UI/SmallerSpinner'
import '../Card/Card.css'

function Card({data}) {
  const [mostrar, setMostrar]=useState(false)
  const light= useSelector(state=>state.theme)

  const handleLoad=()=>{
    setMostrar(!mostrar)
  }

  return (
      <Link to={`/videogames/${data.id}`} className={`mainCard ${light?"lightShadow":"darkShadow"}`}>
          <div className={ `cardSpinner ${!mostrar ? "cardShow": "cardHidden"}`}>
            <SmallerSpinner light={light}/>
          </div>

          <img onLoad={handleLoad} src={data.image} className={`${!mostrar ? "cardHidden": "imageShow"}`} alt={`imagen de ${data.name}`} />
          
          <section>
            <section className={`titulos ${light?"darkText": "lightText"}`}>
              <h4>{data.name}</h4>
              <p>{data.rating} ★</p>
            </section>
              <section className={`plataformas darkText ${light?"lightAccent":"darkAccent"}`}>
                {data.genres.map(e=>{
                  return <p key={data.genres.indexOf(e)}>{e}</p>
                })}
              </section>
          </section>
          </Link>
  )
}

export default Card