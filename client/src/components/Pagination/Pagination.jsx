import '../Pagination/Pagination.css'
function Pagination({cantidadDeElementos, data, paginado}) {
    
    const paginas=[]

    for(let p=0; p < Math.ceil(data.length/cantidadDeElementos); p++){
        paginas.push(p)
    }
    return (
        <section className="paginado">
            {paginas && paginas.map(e =>{
                return <p key={paginas.indexOf(e)} onClick={()=>paginado(e)}>{e+1}</p>
            })}
        </section>
    )
}

export default Pagination