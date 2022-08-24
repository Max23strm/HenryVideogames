
import {useDispatch} from 'react-redux'
import { searchGames, clearSearch } from "../../redux/actions"
import { useState } from "react"

import '../SearchBar/SearchBar.css'

function SearchBar({setSearchFlag, searchFlag}) {
    const dispatch=useDispatch()
    const [busqueda, setBusqueda]= useState("")
    const [error,setError]=useState(false)
    const handleClick=()=>{
        if(busqueda===""){
            setError(true)
        }else{
            setError(false)
            dispatch(searchGames(busqueda))
            setSearchFlag(true)
            setBusqueda("")
        }
    }
    const handleClose=()=>{
        setSearchFlag(false)
        dispatch(clearSearch())
    }

    return (
        <article className="searchBarContainer">
            <section className="searchBar">
                <input className={`${error?"redBorder":null}`}type="text" value={busqueda} placeholder={"Insert your search"} onChange={e=>setBusqueda(e.target.value)}/>
            </section>
            <section className={`button`}>
                <button onClick={handleClick}>Search</button>
                {searchFlag && <button onClick={handleClose}>Close search</button>}
            </section>
        </article>
    )
}

export default SearchBar