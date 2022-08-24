import { Moon } from "../UI/Moon"
import { Sun } from "../UI/Sun"
import Burguer from "../UI/Burguer"
import { Link } from "react-router-dom"
import HomeIcon from '../UI/HomeIcon'
import SearchIcon from '../UI/SearchIcon'
import PlusIcon from '../UI/PlusIcon'
import AboutIcon from '../UI/AboutIcon'
import Close from '../UI/Close'
import { useEffect, useState } from "react"
import { changeTheme } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"

import '../NavBar/Nav.css'

const Nav = () => {
  const dispatch=useDispatch()
  const light= useSelector(state=>state.theme)
  const [mostrar,setMostrar]= useState(false)
  useEffect(()=>{
    setMostrar(false)
  },[])

    const toggle=()=>{
      setMostrar(!mostrar)
    }


  return (
    <nav className={mostrar?"color":"transparent"}>
      <button className="switch" onClick={toggle}>
        {mostrar?<Close light={light}/>:<Burguer light={light}/>}
      </button>

      <section className={`linkNavegacion ${mostrar?"showing":"hidden"}`} >
        <Link to={"/home"}className="areaNavegacion" onClick={()=>setMostrar(false)}>
          <HomeIcon light={light}/>
          <h2>Home</h2>
        </Link>
        
        <Link className="areaNavegacion" to={"/create"} onClick={()=>setMostrar(false)}>
          <PlusIcon light={light}/>
          <h2>Create</h2>
        </Link>

        <Link className="areaNavegacion" to={"/about"} onClick={()=>setMostrar(false)}>
          <AboutIcon light={light}/>
          <h2>About</h2>
        </Link>
        <button onClick={()=>dispatch(changeTheme())}className="themeSwitch">
          {light?<Moon/>:<Sun/>}
          <h2>Theme</h2>
        </button>
      </section>
    </nav>
  )
}


export default Nav