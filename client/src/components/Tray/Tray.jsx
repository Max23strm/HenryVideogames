import Pagination from '../Pagination/Pagination.jsx'
import { useState } from 'react'
import Card from '../Card/Card'
import '../Tray/Tray.css'


function Tray({data}) {
  const [pagina,setPagina]=useState(1)
  const [cantidadDeElementos,setCantidadDeElementos]=useState(15)
  const finalArreglo=pagina * cantidadDeElementos
  const principioArreglo=finalArreglo - cantidadDeElementos
  let mostrando=[]
  if(data) { mostrando = data.slice(principioArreglo, finalArreglo)}

  const paginado= (numero)=>{
    setPagina(numero)
  }
  return (
    <section className='trayContainer'>

      <section className='trayMain'>
          {mostrando && mostrando.map(e=><Card key={e.id} data={e}/>)}

      </section>
      <Pagination cantidadDeElementos={cantidadDeElementos} data={data} paginado={paginado} />
    </section>
  )
}

export default Tray