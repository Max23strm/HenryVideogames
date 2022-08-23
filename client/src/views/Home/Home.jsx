import {getAllGames, getAllGenres} from "../../redux/actions/index"
import {useDispatch, useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react'
import Tray from "../../components/Tray/Tray"
import Filter from '../../components/Filter/Filter'
import Spinner from "../../components/UI/Spinner"
import MainTitle from "../../components/mainTitle/MainTitle"
import '../Home/Home.css'

function Home() {
  const dispatch= useDispatch()
  let allGames= useSelector((state)=> state.showingGames)
  const light= useSelector(state=>state.theme)
  const [filtros,setFiltros]=useState({genero:null, creado:null, orden:null})
  
  useEffect(()=>{
      dispatch(getAllGames())
      dispatch(getAllGenres())
    // eslint-disable-next-line  
  },[])
  return (
    <div className="home">
      <MainTitle light={light} />
      <Filter setFiltros={setFiltros} filtros={filtros}/>
      {allGames[0]?<Tray data={allGames} light={light} />: <Spinner/>}
    </div>
  )
}

export default Home