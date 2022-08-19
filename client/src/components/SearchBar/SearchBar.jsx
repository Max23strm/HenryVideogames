import Tray from "../Tray/Tray"
import {useDispatch, useSelector} from 'react-redux'
import { searchGames } from "../../redux/actions"
import { useState } from "react"
import Spinner from "../UI/Spinner"

import '../SearchBar/SearchBar.css'

let searchFlag="hidden"
function SearchBar() {
    const dispatch=useDispatch()
    const [busqueda, setBusqueda]= useState("")
    let resultadosBusqueda=useSelector(state=>state.searchedGames)
    const handleClick=()=>{
        dispatch(searchGames(busqueda))
        searchFlag="showing"
    }
    return (
        <article className="searchBarContainer">
            <section className="searchBar">
                <input type="text" value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
                <button onClick={handleClick}>Search</button>
            </section>
            <section className={`results ${searchFlag}`}>
                {resultadosBusqueda.length>0 ? <Tray data={resultadosBusqueda}/> : <Spinner/>}
            </section>
            
        </article>
    )
}

export default SearchBar