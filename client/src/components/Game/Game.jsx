import React, { useEffect } from 'react'
import Gallery from '../Gallery/Gallery'
import { useSelector } from 'react-redux'
import '../Game/Game.css'
function Game({data}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const light= useSelector(state=>state.theme)
  
  return (
    data && 
    <article>
      <section className={`mainDetails ${light?"lightThemeContainer gameLight": "darkThemeContainer gameDark"}`}>
        <section className='imageYTitle'>
          <h2 className='title'>
            {data.name}
          </h2>
          {data.background_image &&  <section className='images'>
            <Gallery arr={[data.background_image, data.background_image_additional]}/>
          </section>}
          {data.image &&  <section className='images'>
            <Gallery arr={[data.image]}/>
          </section>}
        </section>


        <section className='secondaryDetails'>

          <section className='mindetails released'>
            <h6>Released:</h6>
            {data.released? <p className={light?"darkText":"lightText"}>{data.released}</p>: <p className={light?"darkText":"lightText"}>{data.fecha_de_lanzamiento}</p>}
          </section>

          <section className='mindetails rating'>
            <h6>Rating:</h6>
            <p className={light?"darkText":"lightText"}>
              {data.rating}★
            </p>
          </section>

          {data.platforms && 
          <section className='mindetails platforms'>
            <h6>Platforms:</h6>
            <section>
              {data.platforms.map(e=>{
                return <p   className={light?"darkText":"lightText"} key={`Plat${data.platforms.indexOf(e)}`}>{e.platform.name}</p>
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
                if(typeof e!=="string"){
                  return <p className={light?"darkText":"lightText"} key={`${data.genres.indexOf(e)}Gen`}>{e.name}</p>
                } else{
                  return <p className={light?"darkText":"lightText"} key={`${data.genres.indexOf(e)}Gen`}>{e}</p>

                }
              })
              }
            </section>
          </section>
          }

        </section>
      </section>


      <section className='detailYweb'>
        {data.description_raw ?<section>
            <h6>Detail:</h6>
            <p className={light?"darkText":"lightText"}>
              {data.description_raw}
            </p>
          </section>:<section>
            <h6>Detail:</h6>
            <p className={light?"darkText":"lightText"}>
              {data.description}
            </p>
          </section> }
        
        {data.website && <a href={data.website} target={"_blank"} rel="noreferrer">Website</a>}
        
      </section>
      
      
    </article>
  )
}

export default Game