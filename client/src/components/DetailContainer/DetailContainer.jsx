import React from 'react'
import Game from '../Game/Game'
import '../DetailContainer/DetailContainer.css'

import Spinner from '../UI/Spinner'
function DetailContainer({data}) {
  return (
    <article className='detailContainer'>
        { data.name ? <Game data={data}/>: <Spinner/>}
    </article>
  )
}

export default DetailContainer