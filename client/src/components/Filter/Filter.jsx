import React, { useState } from 'react'
import {filterGames} from "../../redux/actions/index"
import { useDispatch, useSelector } from 'react-redux'
import FilterIcon from '../UI/FilterIcon'
import '../Filter/Filter.css'
function Filter({setFiltros, filtros}) {
    const dispatch= useDispatch()
    const generos=useSelector(state=>state.allGenres)
    const light= useSelector(state=>state.theme)
    const [mostrarFiltros,setMostrarFiltros]=useState(false)
    let togleFilters=()=>{
        setMostrarFiltros(!mostrarFiltros)
    }
    const setear=()=>{
        dispatch(filterGames(filtros))
    }

    return (
    <section className={`filtersContainer ${light? "lightThemeContainer":"darkThemeContainer"}`}>
        <button className='filterTitulo' onClick={togleFilters}>
            <p className={`tituloFilter ${light?"darkText":"lightText"}`}>Filters</p>
            <FilterIcon/>
        </button>
        <section className={`filterGenerals ${mostrarFiltros?"showing":"hidden"} `}>
                <section className='filterSection'>
                    <section className='filter'>
                        <p className={`${light?"darkText":"lightText"}`}>Show by Genre</p>
                        <select className={`${light?"lightSelect light darkText":"darkSelect dark lightText"}`} onChange={(e)=>setFiltros({...filtros, genero: e.target.value})}>
                            <option value={"All"}>
                                Show all
                            </option>
                            {generos[0] && generos.map(e=>{
                                return <option value={e.name} key={e.id}>{e.name}</option>
                            })}
                        </select>
                    </section>
                    <section className='filter'>
                        <p className={`${light?"darkText":"lightText"}`}>Show Games</p>
                        <select className={`${light?"lightSelect light darkText":"darkSelect dark lightText"}`} onChange={(e)=>setFiltros({...filtros, creado: e.target.value})}>
                            <option value={"All"}>
                                Show all types
                            </option>
                            <option value={"creado"}>
                                Created by us
                            </option>
                            <option value={"estudio"}>
                                Created by studio
                            </option>
                        </select>
                    </section>
                    <section className='filter'>
                        <p className={`${light?"darkText":"lightText"}`}>Sort By...</p>
                        <select className={`${light?"lightSelect light darkText":"darkSelect dark lightText"}`} onChange={(e)=>setFiltros({...filtros, orden: e.target.value})}>
                            <option value={"MejorAPeor"}>
                                Rating (Best first)
                            </option>
                            <option value={"peorAMejor"}>
                                Rating (Worst first)
                            </option>
                            <option value={"AZ"}>
                                A-Z
                            </option>
                            <option value={"ZA"}>
                                Z-A
                            </option>
                        </select>    
                    </section>
                </section>
                <button onClick={setear} className={`filterButton ${light? "darkText lightThemeContainer" : "lightText darkThemeContainer"}`}>Filter</button>
        </section>
    </section>
  )
}

export default Filter