
import Burguer from "../UI/Burguer"
import '../NavBar/Nav.css'
import { Link } from "react-router-dom"
import HomeIcon from '../UI/HomeIcon'
import SearchIcon from '../UI/SearchIcon'
import PlusIcon from '../UI/PlusIcon'
import AboutIcon from '../UI/AboutIcon'
import Close from '../UI/Close'
import { useState } from "react"

const Nav = () => {
   

    const [mostrar,setMostrar]= useState(false)


    const toggle=()=>{
      setMostrar(!mostrar)
    }


  return (
    <nav className={mostrar?"color":"transparent"}>
      <button onClick={toggle}>
        {mostrar?<Close/>:<Burguer/>}
      </button>

      <section className={`linkNavegacion ${mostrar?"showing":"hidden"}`} >
        <Link to={"/home"}className="areaNavegacion">
          <HomeIcon/>
          <h2>Home</h2>
        </Link>

        <Link to={"/search"} className="areaNavegacion">
          <SearchIcon/>
          <h2>Search</h2>
        </Link>
        
        <Link className="areaNavegacion" to={"/"}>
          <PlusIcon/>
          <h2>Create</h2>
        </Link>

        <Link className="areaNavegacion" to={"/"}>
          <AboutIcon/>
          <h2>About</h2>
        </Link>
      </section>
    </nav>
  )
}


export default Nav