import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DetailContainer from '../../components/DetailContainer/DetailContainer'
import MainTitle from '../../components/mainTitle/MainTitle'
import { getById, clearGame } from '../../redux/actions'

import '../GameDetail/GameDetail.css'


function GameDetail() {
  const light= useSelector(state=>state.theme)
  const {id}=useParams()
  const dispatch=useDispatch()
  let data={}
  data= useSelector(state=>state.game)
  useEffect(()=>{
    dispatch(getById(id))
    return()=>{
      dispatch(clearGame())
    }
    // eslint-disable-next-line  
  },[])

  return (
    <article className='gameDetail'>
        <MainTitle light={light}/>
        <DetailContainer data={data}/>
    </article>
  )
}

export default GameDetail