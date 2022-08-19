import React from 'react'
import { Link } from 'react-router-dom'
import Gallery from '../Gallery/Gallery'
 import '../Game/Game.css'
function Game({data}) {
  
  return (
    data && 
    <article>
      <section className='mainDetails'>
        <section className='imageYTitle'>
          <h2 className='title'>
            {data.name}
          </h2>
          <section className='images'>
            <Gallery arr={[data.background_image, data.background_image_additional]}/>
            {/* <img src={data.background_image} alt="" />
            {data.background_image_additional && <img src={data.background_image_additional} alt="" />} */}
          </section>
        </section>
        <section className='secondaryDetails'>
        <section className='mindetails released'>
          <h6>Released:</h6>
          <p>{data.released}</p>
        </section>

        <section className='mindetails rating'>
          <h6>Rating:</h6>
          <p>
            {data.rating}★
          </p>
        </section>

        {data.platforms && 
        <section className='mindetails platforms'>
          <h6>Platforms:</h6>
          <section>
            {data.platforms.map(e=>{
              return <p key={`Plat${data.platforms.indexOf(e)}`}>{e.platform.name}</p>
            })
            }
          </section>
        </section>

        }
        {data.genres &&
        <section className='mindetails genres'>
          <h6>Genres:</h6>
          <section>
            {data.genres.map(e=>{
              return <p key={`${data.genres.indexOf(e)}Gen`}>{e.name}</p>
            })
            }
          </section>
        </section>
        }
      </section>
      </section>
        <section className='detailYweb'>
          {data.description_raw &&<section>
              <h6>Detail:</h6>
              {data.description_raw}
            </section> }
          
          <Link to={data.website}>Website</Link>
          
        </section>
      
      
    </article>
  )
}

export default Game