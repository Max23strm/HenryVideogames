import { useSelector } from 'react-redux'
import '../Pagination/Pagination.css'

function Pagination({cantidadDeElementos, data, paginado}) {
    const light=useSelector(state=>state.theme)
    const paginas=[]

    for(let p=0; p < Math.ceil(data.length/cantidadDeElementos); p++){
        paginas.push(p)
    }
    return (
        <section className={`paginado `}>
            {paginas && paginas.map(e =>{
                e=e+1
                return <p className={`${light?"lightThemeContainer darkText":"darkThemeContainer lightText"}`}
                key={paginas.indexOf(e)}
                onClick={()=>paginado(e)}>
                    {e}
                </p>
            })}
        </section>
    )
}

export default Pagination