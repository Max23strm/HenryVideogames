import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DetailContainer from '../../components/DetailContainer/DetailContainer'
import MainTitle from '../../components/mainTitle/MainTitle'
import { getById } from '../../redux/actions'

import '../GameDetail/GameDetail.css'


function GameDetail() {
    const {id}=useParams()
    const dispatch=useDispatch()
    let data={}
    data= useSelector(state=>state.game)
    useEffect(()=>{
      dispatch(getById(id))
        
    },[])   
  return (
    <article className='gameDetail'>
        <MainTitle/>
        <DetailContainer data={data}/>
    </article>
  )
}

export default GameDetail