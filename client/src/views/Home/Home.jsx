import {getAllGames, getAllGenres} from "../../redux/actions/index"
import {useDispatch, useSelector} from 'react-redux'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
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
  const [searchFlag, setSearchFlag]= useState(false)
  
  useEffect(()=>{
    if(!allGames[0]){
      dispatch(getAllGames())
    }
    window.scrollTo(0, 0)
    dispatch(getAllGenres())
    // eslint-disable-next-line  
  },[])

  return (
    <div className="home">
      <MainTitle light={light} />
      <SearchBar setSearchFlag={setSearchFlag} searchFlag={searchFlag}/>
      <Filter setFiltros={setFiltros} filtros={filtros}/>
      {allGames[0]?<Tray data={allGames} light={light} />: <Spinner/>}
    </div>
  )
}

export default Home