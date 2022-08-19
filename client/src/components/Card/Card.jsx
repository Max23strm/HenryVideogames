import { useState } from 'react'
import {Link} from 'react-router-dom'
import Spinner from '../UI/Spinner'
import '../Card/Card.css'

function Card({data}) {
  const [mostrar, setMostrar]=useState(false)


  const handleLoad=()=>{
    setMostrar(!mostrar)
  }

  return (
      <Link to={`/${data.id}`} className='mainCard'>
          <div className={`${!mostrar ? "show": "hidden"}`}>
            <Spinner />

          </div>
          <img onLoad={handleLoad} src={data.image} className={`${!mostrar ? "hidden": "show"}`} alt={`imagen de ${data.name}`} />
          <section>
            <section className='titulos'>
              <h4>{data.name}</h4>
              <p>{data.rating} ★</p>
            </section>
              <section className='plataformas'>
                {data.genres.map(e=>{
                  return <p key={data.genres.indexOf(e)}>{e}</p>
                })}
              </section>
          </section>
          </Link>
  )
}

export default Card