import Pagination from '../Pagination/Pagination.jsx'
import { useEffect, useState } from 'react'
import Card from '../Card/Card'
import '../Tray/Tray.css'


function Tray({data, light}) {

  const [pagina,setPagina]=useState(1)
  const cantidadDeElementos=15
  const finalArreglo=pagina * cantidadDeElementos
  const principioArreglo=finalArreglo - cantidadDeElementos
  let mostrando=[]
  
  if(data) { mostrando = data.slice(principioArreglo, finalArreglo)}

  const paginado= (numero)=>{
    setPagina(numero)
  }
  useEffect(()=>{
    paginado(1)
  },[data])
  return (
    <section className={`trayContainer`}>

      <section className={`${mostrando[0]==="vacio"?"errorTray":"trayMain"} ${light?"lightThemeContainer":"darkThemeContainer"}`}>
          {mostrando && (mostrando[0]==="vacio"?<h2 className='errorSearch'>No match found</h2>:mostrando.map(e=><Card key={e.id} data={e}/>))}

      </section>
      <Pagination cantidadDeElementos={cantidadDeElementos} data={data} paginado={paginado} />
    </section>
  )
}

export default Tray